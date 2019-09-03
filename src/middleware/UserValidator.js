import JoiValidator from "./JoiValidator";
import { userCreateSchema } from "../helpers";

export default class UserValidator {
    static validateCreateUser(req, res, next) {
        return JoiValidator.validateRequestBody(req, res, next, userCreateSchema);
    }
}
