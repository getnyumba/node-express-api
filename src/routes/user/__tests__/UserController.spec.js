import { UserService } from "../../../services";
import UserController from "../user-controller";

let req;
let res;
describe('UserController', () => {
  beforeEach(() => {
    res = {
      json: jest.fn()
    };
  });
  console.log(UserService);
  it('should return all users', async () => {
    jest.spyOn(UserService, 'findAllUsers').mockResolvedValue([]);
    await UserController.getAllUserRecords(req, res);
    expect(UserService.findAllUsers).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data: [] });
  });

  it('should register a new user', async () => {
    jest.spyOn(UserService, 'registerUser').mockResolvedValue([]);
    await UserController.registerUser(req, res);
    expect(UserService.registerUser).toHaveBeenCalled();
  });

  it('should comfirm new user account', async () => {
    jest.spyOn(UserService, 'confirmEmail').mockResolvedValue([]);
    await UserController.confirmEmail(req, res);
    expect(UserService.confirmEmail).toHaveBeenCalled();
  });
});
