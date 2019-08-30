import * as Joi from '@hapi/joi';

const userCreateSchema  =  Joi.object().keys({
        username: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        email: Joi.string().required().trim(),
        confirmPassword: Joi.string().required().trim()
}).min(3).max(3);

export default userCreateSchema;