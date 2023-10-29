const joi = require("joi")
const validateUser = (req, res, next) => {
    try {
        const userSchema = joi.object({
            first_name: joi.string()
                .empty()
                .required()
                .messages({
                    "string.base": `"first_name" must be of type "text"`,
                    "string.empty": `"first_name" can not be empty`,
                    "string.required": `"first_name" is required`
                }),
            last_name: joi.string()
                .empty()
                .required()
                .messages({
                    "string.base": `"last_name" must be of type "text"`,
                    "string.empty": `"last_name" can not be empty`,
                    "string.required": `"last_name" is required`
                }),
            password: joi
                .string()
                .empty()
                .required()
                .min(8)
                .messages({
                    "string.base": `"password" must be of type "text"`,
                    "string.empty": `"password" can not be empty`,
                    "string.required": `"password" is required`,
                    "string.min": `"password" should have a minimum of {8}`,

                }),

            email: joi
                .string()
                .empty()
                .required()
                .email()
                .messages({
                    "string.base": `"email" must be of type "text"`,
                    "string.empty": `"email" can not be empty`,
                    "string.required": `"email" is required`
                }),

           gender: joi.string().empty().valid("male", "female"),
            country: joi
                .string()
                .empty()
                .required()
                .messages({
                    "string.base": `"country" must be of type "text"`,
                    "string.empty": `"country" can not be empty`,
                    "string.required": `"country" is required`
                }),

        });

        userSchema.validateAsync(req.body, { abortEarly: true })

        next()
    } catch (err) {
        res.status(402).json({
            message: "invalid information",
            error: err.message
        })
    }
};

const validateLogInfo = async (req, res, next) => {
    try {
        const userSchema = joi.object({
            email: joi.string().email().empty().required()
                .messages({
                    "string.base": `"email" must be of type "text"`,
                    "string.empty": `"email" can not be empty`,
                    "string.required": `"email" is required`
                }),

            password: joi
                .string()
                .empty()
                .required()
                .min(8)
                .messages({
                    "string.base": `"password" must be of type "text"`,
                    "string.empty": `"password" can not be empty`,
                    "string.required": `"password" is required`,
                    "string.min": `"password" should have a minimum of {8}`,

                }),

        });

        userSchema.validateAsync(req.body, {abortEarly:true})

        next()
    }
    catch (error) {
        return({
            message: "invalid information"
        })
    }

     }



    module.exports = {validateUser, validateLogInfo}

