/*
Middlewares handle requests before they can be passed to the controller which
execute the request
middlewares never complete a request they just check and verify the request before
calling the controller
Middleware can perform tasks like authentication validation
all middleware must contain req, res, next in there parrams


/ */
import JoiMiddleware from "./JoiValidator";
import UserValidator from "./UserValidator";

export { JoiMiddleware, UserValidator };
