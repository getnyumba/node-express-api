import JoiValidator from './JoiValidator';
import {
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema
} from '../helpers';

export default class UserValidator {
  static validateCreateUser(req, res, next) {
    return JoiValidator.validateRequestBody(req, res, next, userCreateSchema);
  }

  static validateUserLogin(req, res, next) {
    return JoiValidator.validateRequestBody(req, res, next, userLoginSchema);
  }

  static validateUpateUser(req, res, next) {
    return JoiValidator.validateRequestBody(req, res, next, userUpdateSchema);
  }
}
