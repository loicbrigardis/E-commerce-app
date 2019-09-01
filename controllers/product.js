const formidable = require('formidable');
const mongoose = require('mongoose');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');

exports.productById = async (req, res, next, id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            err: [{ msg: "Products not found" }]
        })
    } else {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(400).json({
                err: [{ msg: "Product not found" }]
            })
        }

        req.product = product;
        next();
    }

}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                err: [{ msg: "Image could not be uploaded" }]
            })
        }

        //Check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                err: [{ msg: "All fields are required" }]
            })
        }

        let product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    err: [{ msg: "Image could not be more than 1mega" }]
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    err: [
                        {
                            "msg": "We have an error with your product",
                            "infos": err.errors
                        }
                    ]
                })
            }
            res.json(result);
        })
    })
}

exports.remove = (req, res) => {
    let product = req.product;
    if (!product) {
        return res.status(400).json({
            err: [{ msg: "Product not found" }]
        })
    } else {
        product.remove((err, deletedProtuct) => {
            if (err) {
                return res.status(400).json({
                    err: [{ msg: "Product not found" }]
                })
            }
            return res.status(200).json({
                deletedProtuct
            });
        })
    }

}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                err: [{ msg: "Image could not be uploaded" }]
            })
        }

        //Check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                err: [{ msg: "All fields are required" }]
            })
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    err: [{ msg: "Image could not be more than 1mega" }]
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    err: [
                        {
                            "msg": "We have an error with your product",
                            "infos": err.errors
                        }
                    ]
                })
            }
            return res.json(result);
        })
    })
}

/**
 * SELL / ARRIVAL
 * by sell - ?sortBy=sold&order=desc&limit=4
 * by arrival - ?sortBy=createdAt&order=desc&limit=5
 */

exports.list = (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'asc';
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    err: [{ msg: "Products not found" }]
                })
            }

            return res.json(products);
        })
}


/**
 * Find product by req product category
 * other product will be returned
 */
exports.listRelated = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err || !products) {
                return res.status(400).json({
                    err: [{ msg: "Products not found" }]
                })
            }

            return res.json(products);
        });
}

exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err || !categories) {
            return res.status(400).json({
                err: [{ msg: "Products not found" }]
            })
        }
        res.json(categories);
    })
}

exports.listBySearch = (req, res) => {
    const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    const order = req.body.order ? req.body.order : 'desc';
    const limit = req.body.limit ? parseInt(req.body.limit) : 100;
    const skip = parseInt(req.body.skip);
    const findArgs = {};

    /**
     * example
     * filters: { price: { $lte: 10, $gte: 0 }, name: "React", description: "Dev" }
     */

    for (const key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], //greater than price [0-10]
                    $lte: req.body.filters[key][1] //less than
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }

        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err || !products) {
                return res.status(400).json({
                    err: [{ msg: "Products not found" }]
                })
            }

            res.json({
                size: products.length,
                products
            });
        })

}

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}