import { UserService } from "../../../services";
import UserController from "../UserController";

let req;
let res;
describe("UserController", () => {
    beforeEach(() => {
        res = {
            json: jest.fn(),
        };
    });
    it("should return all users", async () => {
        jest.spyOn(UserService, "findAllUsers").mockResolvedValue([]);
        await UserController.getAllUserRecords(req, res);
        expect(UserService.findAllUsers).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ data: [] });
    });
});
