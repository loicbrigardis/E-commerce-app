const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');

const User = require('../models/user');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    var sortedErrors = _.chain(errors.errors)
        .groupBy("param")
        .value();

    if (!errors.isEmpty()) {
        return res.status(422).json({ err: sortedErrors });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        console.log(err);
        if (err) {
            return res.status(400).json({
                err: [
                    {
                        "msg": "User already exist",
                        "infos": err.errors
                    }
                ]
            })
        }

        user.salt = undefined;
        user.hashed_password = undefined;
        return res.json({ user });

    })
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //If no user
    if (!user) {
        return res.status(400).json({
            err: [
                { msg: 'User does not exist. Please signup!' }
            ]
        })
    }

    if (!user.authenticate(password)) {
        return res.status(401).json({
            err: [
                { msg: 'Email and password dont match' }
            ]
        });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //Token in cookie
    res.cookie('t', token, { expire: new Date() + 9999 });

    const { _id, name, email: userEmail, role } = user;

    return res.json({ token, user: { _id, userEmail, name, role } });

}

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ "msg": "Signout success" })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            err: [{ msg: "Access denied" }]
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            err: [{ msg: "Admin ressource! Access denied" }]
        })
    }
    next();
}