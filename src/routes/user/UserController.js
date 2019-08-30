import { UserService } from "../../services";


export default class UserController {
    
    static async getAllUserRecords(req, res) {
        const response = await UserService.findAllUsers({})
        return res.json({
            data: response
        });
    }
}