import JoiValidator from "./JoiValidator";
import { userSchema } from "../helpers";

export default class UserValidator {

    static validateCreateUser(req, res, next) {
        return JoiValidator.validateRequestBody(req, res, next, userSchema);
    }
}