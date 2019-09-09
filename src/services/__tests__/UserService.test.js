import { models } from "../../database";
import { UserService } from "..";

describe("UserService", () => {
    it("should return all users", async () => {
        jest.spyOn(models.User, "find").mockReturnValue([]);
        const result = await UserService.findAllUsers({});
        expect(result).toEqual([]);
    });
});
