
import Validator from 'validatorjs';
import dotenv from 'dotenv';

import utils from './../utils/index';
import error from './../utils/errorMessage';
import validateObject from './../middleware/validate';


const { pgConnect, tokens } = utils;
const { serverMessage } = error;
const { signUpRules, signUpErrorMessage, loginRules, loginErrorMessage, questionRules, questionErrorMessage, commentRules, commentErrorMessage }  = validateObject;

const client = pgConnect();
client.connect();


dotenv.config();

/**
 * middleware class
 * 
 * @class Middleware
*/
class Middleware {
  /**
   * @desc authenticates a user
   *
   * @param {object} req
   *@param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static authenicateUser(req, res, next) {
    const token = tokens(req);
    if (!token) {
      return serverMessage(res, 'fail', 'Token not provided or Invalid', 401);
    }
    return next();
  }

    /**
   * @desc authenticates an admin
   *
   * @param {object} req
   *@param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static async authenicateAdmin(req, res, next) {
    const token = tokens(req);
    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'Token not provided or Invalid Token' });
    }
    if (token.user_role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'Forbidden to non admin' });
    }
    return next();
  }

    /**
   * @desc it validates user signup 
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateSignUp(req, res, next) {
    const {
      username, email, password, password_confirmation
    } = req.body;
    const data = {
     username,
     email,
     password,
     password_confirmation
    };
    const validation = new Validator(data, signUpRules, signUpErrorMessage);

    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }

    /**
   * @desc validates the login field
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateLogin(req, res, next) {
    const {
      email, password
    } = req.body;
    const data = {
     email,
     password,
    };
    const validation = new Validator(data, loginRules, loginErrorMessage);

    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }

    /**
   * @desc it validates input for create question endpoint
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateQuestion(req, res, next) {
    const { question, date} = req.body;
    const data = { question, date};
    const validation = new Validator(data, questionRules, questionErrorMessage);
   
    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }

    /**
   * @desc it validates input for create comment endpoint
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateComment(req, res, next) {
    const { comment, likes} = req.body;
    const data = { comment, likes};
    const validation = new Validator(data, commentRules, commentErrorMessage);
   
    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }

    /**
   * @desc checks if an email exist
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   *
   * @returns {object} done
   */
  static async checkMail(req, res, done) {
    try {
      const { email } = req.body;
      const checkEmail = `
            SELECT * 
            FROM users
            WHERE email = '${email}'   
      `;
      const foundEmail = await client.query(checkEmail);
      if (foundEmail.rows[0]) {
        return serverMessage(res, 'fail', 'email is already existing', 409);
      }
    } catch (error) {
      return serverMessage(res, 'fail', error.message, 500);
    }
    return done();
  }

      /**
   * @desc checks if an email exist
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   *
   * @returns {object} done
   */
  static async checkUsername(req, res, done) {
    try {
      const { username } = req.body;
      const checkUsernameQuery = `
            SELECT * 
            FROM users
            WHERE user_name = '${username}'   
      `;
      const foundUser = await client.query(checkUsernameQuery);
      if (foundUser.rows[0]) {
        return serverMessage(res, 'fail', 'username is already existing', 409);
      }
    } catch (error) {
      return serverMessage(res, 'fail', error.message, 500);
    }
    return done();
  }

}


export default Middleware;

