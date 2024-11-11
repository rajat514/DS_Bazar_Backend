const { body } = require("express-validator");

validateCreteGame = [
    body('name')
        .notEmpty().isString().withMessage('please enter the valid name!')
]


validateGameResult = [
    body('gameId')
        .notEmpty().isString().withMessage('please enter the valid gameId!'),

    body('result')
        .notEmpty().isNumeric().withMessage('please enter the valid result!')
]


module.exports = {
    validateCreteGame, validateGameResult
}