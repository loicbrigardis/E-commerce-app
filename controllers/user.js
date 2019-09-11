const User = require('../models/user');
const { Order } = require('../models/order');

exports.userById = async (req, res, next, id) => {
    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({
            err: [
                { msg: 'User not found' }
            ]
        })
    }
    req.profile = user;
    next();
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized'
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        return res.json(user);

    })
}

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.quantity,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true },
        (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Count not update user purchase history'
                })
            }
            next();
        })
}

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: 'Count not load user purchase history'
                })
            }
            return res.json(orders);
        })
}