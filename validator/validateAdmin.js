const { body } = require("express-validator");

validateSignUp = [
    body('email')
        .notEmpty().isEmail().withMessage('please enter the valid email!'),

    body('password')
        .notEmpty().isLength({ min: 6, max: 12 }).withMessage('password should be between 6 to 12!')
]


module.exports = {
    validateSignUp
}