const joi = require("joi")

const createValidations = joi.object({
        name:joi.string().required().min(3),
        surname:joi.string().required().min(2),
        username:joi.string().required().min(3),
        password:joi.string().required().min(6),
        email:joi.string().required().min(7),
})
const loginValidations = joi.object({
    username:joi.string().required().min(3),
    password:joi.string().required().min(6),
})
const resetSendPasswordLinkToMailValidations = joi.object({
    email:joi.string().required().min(7)
})
const resetPasswordValidations = joi.object({
    password:joi.string().required().min(6),
    confirmPassword:joi.string().required().min(6)
})

module.exports = {
    createValidations,
    loginValidations,
    resetPasswordValidations,
    resetSendPasswordLinkToMailValidations,
}