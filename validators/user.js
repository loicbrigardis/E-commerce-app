const { check, validationResult } = require('express-validator');

exports.userValidator = [
    check('name').not().isEmpty().withMessage('The name is required'),
    check('email').isEmail().withMessage('Email invalid'),
    check('email').isLength({ min: 4, max: 32 }).withMessage('Your email is not valid (min 4 chars and max 32)'),
    check('password').isLength({ min: 6 }).withMessage('Your email is too short'),
    check('password').not().isEmpty().withMessage('The password is required'),
    check('password').matches(/[0-9]/).withMessage('The password must contain at least one number')
]