
import Validator from 'validatorjs';
import dotenv from 'dotenv';

import utils from './../utils/index';
import error from './../utils/errorMessage';
import validateObject from './../middleware/validate';
import query from './../utils/query';


const { pgConnect, tokens } = utils;
const { serverMessage } = error;
const { signUpRules, signUpErrorMessage, loginRules, loginErrorMessage, questionRules, questionErrorMessage, commentRules, commentErrorMessage }  = validateObject;

const { checkMail } = query;

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
  static validateQuestionAndComment(req, res, next) {
    const requestObject = req.originalUrl.slice(8, 17);
    let data, validation, dataComment, dataQuestion;

    let rule = {
      comment: [commentRules, commentErrorMessage],
      question: [questionRules, questionErrorMessage]
    };

    if (requestObject === 'comments') {
       const { comment, likes} = req.body;
       dataComment = { comment, likes};
       data = dataComment;
       validation = new Validator(data, rule.comment[0], rule.comment[1]);
    }

    if ( requestObject === 'questions') {
      const  {question, date} = req.body;
      dataQuestion = { question, date};
      data = dataQuestion;
      validation = new Validator(data, rule.question[0], rule.question[1]);
    }
   
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
   * @desc checks if an email or username exist
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   *
   * @returns {object} done
   */
  static async checkMailAndUsername(req, res, done) {
    try {
      const { email, username } = req.body;
      let foundValue;
      foundValue = await client.query(checkMail('user_name', username));

      if (foundValue.rows[0]) {
        return serverMessage(res, 'fail','username is already existing', 409);
      }

     foundValue = await client.query(checkMail('email', email));
     if (foundValue.rows[0]) {
      return serverMessage(res, 'fail', 'email is already existing', 409);
    }

    } catch (error) {
      return serverMessage(res, 'fail', error.message, 500);
    }
    return done();
  }


}


export default Middleware;

