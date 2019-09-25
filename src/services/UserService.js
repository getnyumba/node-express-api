import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import { models } from '../database';
import bcrypt from 'bcrypt';

const { User, Token } = models;
require('dotenv').config();

export default class UserService {
  static async findAllUsers(options) {
    const results = await models.User.find(options);
    return results;
  }

  static async registerUser(req, res) {
    const userParam = req.body;
    let exception = '';
    if (
      await User.findOne({
        username: userParam.username
      })
    ) {
      exception = `Username "${userParam.username}" is already in use`;
    } else if (
      await User.findOne({
        phone_number: userParam.phone_number
      })
    ) {
      exception = `Phone number "${userParam.phone_number}" is already in use`;
    } else if (
      await User.findOne({
        email: userParam.email
      })
    ) {
      exception = `Email "${userParam.email}" is already in use`;
    }
    if (userParam.password !== userParam.confirmPassword) {
      exception = 'Passwords do not match';
    }

    if (exception) {
      if (exception === 'Passwords do not match') {
        return res.status(400).send({ msg: exception });
      }
      return res.status(409).send({ msg: exception });
    }
    const user = new User(userParam);

    return user.save(async err => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      }

      // Create a verification token for this user
      const { _id: id } = user;
      const token = new Token({
        _userId: id,
        token: UserService.signToken(user.email)
      });

      // Save the verification token
      await token.save(tokenErr => {
        if (tokenErr) {
          return res.status(400).send({ msg: tokenErr.message });
        }
      });

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const mailOptions = {
        from: 'no-reply@yourwebapplication.com',
        to: user.email,
        subject: 'Account Verification Token',
        text: `${'Hello,\n\n' +
          'Please verify your account by clicking the link: \nhttp://'}${
          req.headers.host
        }/api/v1/users/confirmation/${token.token}.\n`
      };

      sgMail.send(mailOptions, mailErr => {
        if (mailErr) {
          return res.status(500).send({ msg: mailErr.message });
        }
      });

      return res.status(200).send({
        msg: `A verification email has been sent to ${user.email}.`
      });
    });
  }

  static signToken(email) {
    const payload = { userEmail: email };
    const token = jwt.sign(payload, process.env.JWTSECRETKEY, {
      expiresIn: '1d'
    });
    return token;
  }

  static async confirmEmail(req, res) {
    Token.findOne({ token: req.params.token }, (err, token) => {
      if (!token) {
        return res.status(400).send({
          type: 'not-verified',
          msg:
            'We were unable to find a valid token. Your token my have expired.'
        });
      }
      const payload = UserService.verifyToken(req.params.token, res);

      // If we found a token, find a matching user
      const { _userId: userId } = token;
      User.findOne({ _id: userId, email: payload.userEmail }, (err, user) => {
        if (!user) {
          return res.status(400).send({
            msg: 'We were unable to find a user for this token.'
          });
        }
        if (user.isVerified) {
          return res.status(400).send({
            type: 'already-verified',
            msg: 'This user has already been verified.'
          });
        }

        // Verify and save the user
        user.isVerified = true;
        user.save(updateErr => {
          if (updateErr) {
            return res.status(500).send({ msg: updateErr.message });
          }
          res.status(200).send('The account has been verified. Please log in.');
        });
      });
    });
  }

  static verifyToken(token, res) {
    let decodedResult = '';
    jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ msg: err.message });
      }
      decodedResult = decoded;
    });
    return decodedResult;
  }

  static async userLogin(req, res) {
    const { username, password } = req.body;
    await User.findOne({ username: username }, (loginErr, user) => {
      if (!user) {
        return res
          .status(404)
          .send({ msg: 'User not found. Please signup and try again' });
      }
      if (user && bcrypt.compareSync(password, user.hash)) {
        if (user.isVerified) {
          const { hash, ...userWithoutHash } = user.toObject();
          const token = jwt.sign(
            { subscriber: user.id },
            process.env.JWTSECRETKEY,
            {
              expiresIn: '1d'
            }
          );
          return res.status(200).send({
            msg: { ...userWithoutHash, token, response: 'login sucessful' }
          });
        } else {
          return res.status(401).send({
            msg: 'user email not verified. Please confirm your email'
          });
        }
      } else {
        return res.status(401).send({ msg: 'Unauthourised acess. Try again.' });
      }
    });
  }

  static async getUserProfile(req, res) {
    const { subscriber } = req.jwt;
    await User.findOne({ _id: subscriber }, (err, user) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      if (!user) {
        return res.status(404).send({ msg: 'user profile not found' });
      }
      const { hash, ...userWithoutHash } = user.toObject();
      return res.status(200).send({ msg: 'user profile', ...userWithoutHash });
    });
  }
}
