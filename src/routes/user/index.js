import { Router } from 'express';
import UserController from './UserController';
import UserValidator from '../../middleware/UserValidator';
import { SecureRoute } from '../../middleware';

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

userRouter.post('/confirmation/:token', UserController.confirmEmail);

userRouter.post(
  '/login',
  UserValidator.validateUserLogin,
  UserController.loginUser
);

userRouter.get('/me', SecureRoute.loginRequired, UserController.getUserProfile);

userRouter.put(
  '/me',
  SecureRoute.loginRequired,
  UserValidator.validateUpateUser,
  UserController.updateUserProfile
);

userRouter.delete(
  '/me',
  SecureRoute.loginRequired,
  UserController.deleteUserAccount
);
export default userRouter;
