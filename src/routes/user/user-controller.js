import { UserService } from "../../services";
import {
    FacebookAuthentication,
    GoogleAuthentication,
    UserHelper,
} from "../../helpers";


export default class UserController {
    /**
     * @param  {Request} req
     * @param  {Response} res
     * @returns {Promise<Response>} with array of users
     */
    static async getAllUserRecords(req, res) {
        const response = await UserService.findAllUsers({});
        return res.json({
            data: response,
        });
    }

    /**
     * @param  {Request} req
     * @param  {Response} res
     * @returns {Promise<Response>} authenticated user via google
     */
    static async googleAuthentication(req, res) {
        try {
            const { query: { accessToken } } = req;
            const profile = await GoogleAuthentication.getGoogleProfile(accessToken);
            if (profile.error) {
                return res.status(400).send({
                    success: false,
                    message: "Couldn't get user Profile info",
                });
            }
            const userInfo = GoogleAuthentication.extractUserProfile(profile);
            const user = await UserHelper.createSocialUser({
                username: userInfo.displayName + Math.random().toString(36).substring(7),
                email: userInfo.email,
            });
            return res.status(200).send({
                user,
            });
        } catch (e) {
            return res.status(500).send({
                success: false,
                message: "Couldn't authenticate user with google",
            });
        }
    }

    /**
     * @param  {Request} req
     * @param  {Response} res
     * @returns {Promise<Response>} authenticated user via facebook
     */
    static async faceBookAuthentication(req, res) {
        try {
            const { query: { accessToken } } = req;
            const response = await FacebookAuthentication.getFaceBookProfile(accessToken);
            const profile = UserController.validateFacebookProfile(response, res);
            const user = await UserHelper.createSocialUser({
                email: profile.email,
                username: profile.name + Math.random().toString(36).substring(7),
            });
            return res.json(user);
        } catch (e) {
            return res.status(500).send({
                success: false,
                message: e.message || "Unable to authenticate user with facebook",
            });
        }
    }

    /**
     * @param  {} response
     * @param  {Response} res
     * @returns user profile
     * @throws error message is profile is not got successfully
     */
    static validateFacebookProfile(response, res) {
        if (response.error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: response.error.message || "Failed to get profile",
                });
        }
        const profile = FacebookAuthentication.serializeProfile(response);
        if (!profile.email) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: "This account doesnt have email associated with it,"
              + "Please use a different account or sign up using google or an email ",
                });
        }
        return profile;
    }
}
