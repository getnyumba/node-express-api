/*
Middleware handle requests before they can be passed to the controller which
execute the request
middleware never complete a request they just check and verify the request before
calling the controller
Middleware can perform tasks like authentication validation
all middleware must contain req, res, next in there parrams


/ */
import JoiMiddleware from './JoiValidator';
import UserMiddleware from './user-middleware';
import SecureRoute from './SecureRoute';

export { JoiMiddleware, UserMiddleware, SecureRoute };

import UserValidations from "./validations/user-validations";

/* eslint-disable import/prefer-default-export */
export {
    UserValidations,
};
