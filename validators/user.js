const { check, validationResult } = require('express-validator');

exports.userValidator = [
    check('name').not().isEmpty().withMessage('The name is required'),

    check('email')
        .isEmail().withMessage('Your email is not valid')
        .isLength({ min: 4, max: 32 }).withMessage('Your email must contains min 4 chars and max 32'),

    check('password')
        .matches(/[0-9]/).withMessage('The password must contain at least 1 number')
        .not().isEmpty().withMessage('The password is required')
        .isLength({ min: 6 }).withMessage('The password is required and must contains min 6 chars')
]