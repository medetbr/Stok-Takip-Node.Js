const joi = require("joi")

const createValidations = joi.object({
        name:joi.string().required().min(3),
        surname:joi.string().required().min(2),
        phoneNumber:joi.string().required(),
        address:joi.string().required(),
        email:joi.string().required().min(7),
})

module.exports = {
    createValidations,
}