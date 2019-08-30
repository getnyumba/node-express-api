import { models } from '../database';


export default class UserService {

    static async findAllUsers(options) {
        const results  = await models.User.find(options)
        return results;
    }
}