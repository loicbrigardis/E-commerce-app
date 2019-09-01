const Category = require('../models/category');

exports.categoryById = async (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                err: [{ "msg": "Category does not exist" }]
            })
        }
        req.category = category;
        next();
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body);

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: [{ "msg": "User already exist" }]
            })
        }

        res.json({ data });
    })
}

exports.read = (req, res) => {
    return res.json(req.category);
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: [{ "msg": "Impossible to update" }]
            })
        }
        return res.json(data);
    })
}

exports.remove = (req, res) => {
    const category = req.category;

    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                err: [{ "msg": "Impossible to delete" }]
            })
        }
        return res.json({ msg: 'Category deleted' });
    })
}
exports.list = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json(categories);
    } catch (err) {
        return res.status(400).json({
            err: [{ "msg": "no categories found" }]
        })
    }
}