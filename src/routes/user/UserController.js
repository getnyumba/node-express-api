import { UserService } from '../../services';

export default class UserController {
  static async getAllUserRecords(req, res) {
    const response = await UserService.findAllUsers({});
    return res.json({
      data: response
    });
  }

  static async registerUser(req, res) {
    await UserService.registerUser(req, res);
  }

  static async confirmEmail(req, res) {
    await UserService.confirmEmail(req, res);
  }
}
