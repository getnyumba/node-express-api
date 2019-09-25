import UserService from '../services/UserService';

export default class SecureRoute {
  static loginRequired(req, res, next) {
    const { headers } = req;
    const { authorization } = headers;
    if (authorization) {
      try {
        let authToken = authorization.split(' ');
        if (authToken[0] == !'Bearer') {
          return res
            .status(401)
            .send({ msg: 'Unauthorized access. Login and try again' });
        }
        req.jwt = UserService.verifyToken(authToken[1], res);
        return next();
      } catch (error) {
        return res.status(403).send({ msg: error });
      }
    } else {
      return res.status(401).send({ msg: 'No authorization headers' });
    }
  }
}
