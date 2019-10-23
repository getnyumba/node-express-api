import { UserService } from '../../../services';
import UserController from '../user-controller';

let req;
let res;
describe('UserController', () => {
  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn(() => ({ send: jest.fn() }))
    };
    req = { params: {}, query: {}, body: {} };
  });

  it('should return all users', async () => {
    jest.spyOn(UserService, 'findAllUsers').mockResolvedValue([]);
    await UserController.getAllUserRecords(req, res);
    expect(UserService.findAllUsers).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data: [] });
  });

  it('should register a new user', async (done) => {
    req.body = {
      username: 'araali',
      password: 'araali',
      confirmPassword: 'araali',
      email: 'araal@email.com'
    };
    jest.spyOn(UserService, 'createUser').mockResolvedValue([]);
    await UserController.registerUser(req, res);
    expect(UserService.createUser).toHaveBeenCalled();
    done();
  });

  it('should comfirm new user account', async () => {
    jest.spyOn(UserService, 'updateUser').mockResolvedValue([]);
    await UserController.confirmEmail(req, res);
    expect(UserService.updateUser).toHaveBeenCalled();
  });
});
