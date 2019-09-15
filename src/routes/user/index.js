<<<<<<< HEAD
import { Router } from 'express';
import UserController from './UserController';
import UserValidator from '../../middleware/UserValidator';
import { SecureRoute } from '../../middleware';
=======
import { Router } from "express";
import UserController from "./user-controller";
import { UserValidations } from "../../middleware";
>>>>>>> setup social authentication

const userRouter = Router();

userRouter.get('', UserController.getAllUserRecords);

userRouter.post(
  '',
  UserValidator.validateCreateUser,
  UserController.getAllUserRecords
);

userRouter.post(
  '/register',
  UserValidator.validateCreateUser,
  UserController.registerUser
);

<<<<<<< HEAD
userRouter.post('/confirmation/:token', UserController.confirmEmail);

userRouter.post(
  '/login',
  UserValidator.validateUserLogin,
  UserController.loginUser
);

userRouter.get('/me', SecureRoute.loginRequired, UserController.getUserProfile);
=======
userRouter.get(
    "/google",
    UserValidations.validateAccessToken,
    UserController.googleAuthentication,
);

userRouter.get(
    "/facebook",
    UserValidations.validateAccessToken,
    UserController.faceBookAuthentication,
);
>>>>>>> setup social authentication

export default userRouter;
