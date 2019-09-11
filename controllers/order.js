const { Order, CartItem } = require('../models/order');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    err: [{ msg: err }]
                })
            }

            req.order = order;
            next();
        })
}

exports.create = (req, res) => {
    console.log('create order', req.body);
    req.body.order.user = req.profile;

    const order = new Order(req.body.order);
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: [{ msg: err }]
            })
        }
        res.json(data);
    })
}

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', "_id name adress")
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    err: [{ msg: err }]
                })
            }
            return res.json(orders);
        })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                err: [{ msg: err }]
            })
        }
        return res.json(order);
    })
}
