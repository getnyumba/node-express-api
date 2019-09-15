import { models } from "../database";

export default class UserService {
    /**
     * @param  {object} options
     * @returns {Promise}
     * @description returns all users or filtered using options param
     */
    static async findAllUsers(options) {
        const results = await models.User.find(options);
        return results;
    }

    /**
     * @param  {object} options
     * @returns {Promise} any
     * @description returns a single user object basing on the options
     */
    static async findOneUser(options) {
        const user = await models.User.find(options);
        return user;
    }

    /**
     * @param  {object} data
     * @returns {Promise}
     * @description creates a single user object from data object
     *@
     */
    static async createUser(data) {
        const newUser = await models.User.create({ ...data });
        return newUser;
    }
}
