import * as Joi from '@hapi/joi';

const userCreateSchema = Joi.object()
  .keys({
    first_name: Joi.string()
      .required()
      .trim(),
    second_name: Joi.string()
      .required()
      .trim(),
    phone_number: Joi.string()
      .regex(/^[0-9]{10,12}$/, 'valid phone number')
      .required()
      .trim(),
    username: Joi.string()
      .required()
      .trim(),
    password: Joi.string()
      .required()
      .trim(),
    email: Joi.string()
      .email()
      .required()
      .trim(),
    confirmPassword: Joi.string()
      .required()
      .trim()
  })
  .min(7)
  .max(10);

const userLoginSchema = Joi.object()
  .keys({
    username: Joi.string()
      .required()
      .trim(),
    password: Joi.string()
      .required()
      .trim()
  })
  .min(2)
  .max(2);

export { userCreateSchema, userLoginSchema };
