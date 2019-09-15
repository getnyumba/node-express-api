/*
Middleware handle requests before they can be passed to the controller which
execute the request
middleware never complete a request they just check and verify the request before
calling the controller
Middleware can perform tasks like authentication validation
all middleware must contain req, res, next in there parrams


/ */
<<<<<<< HEAD
import JoiMiddleware from './JoiValidator';
import UserValidator from './UserValidator';
import SecureRoute from './SecureRoute';

export { JoiMiddleware, UserValidator, SecureRoute };
=======

import UserValidations from "./validations/user-validations";

/* eslint-disable import/prefer-default-export */
export {
    UserValidations,
};
>>>>>>> setup social authentication
