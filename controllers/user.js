const User = require('../models/user');

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