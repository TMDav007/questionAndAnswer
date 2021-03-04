import jwt from 'jsonwebtoken';

import utils from './../utils/index'
import error from './../utils/errorMessage';


const { pgConnect, tokens } = utils;
const client = pgConnect();
client.connect();

let token;

const { serverMessage } = error;

/**
 * it is a class that control all user event method
 */
class usersController {
/**
  * it create a new user
  * @param {string} req
  * @param {string} res
  * @return {object} an object
  */
  static async signUp(req, res){
    try{
      const { username, email, password } = req.body;
        const createUser = `
          INSERT INTO users (
            user_name,
            email,
            password
          )
          VALUES (
            '${username}',
            '${email}',
            crypt('${password}', gen_salt('${process.env.KEY}', 5))
          ) RETURNING user_name, email,user_role;
        `;

      const result = await client.query(createUser);
      return res.status(201).json({
        status: 'success',
        data: { newUser: result.rows[0]},
        message: 'user created successfully'
      });
    } catch (error) {
    return  serverMessage(res, 'fail', error.message, 500);
    }
  }

/**
 * it creates a new user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const checkEmailAndPassword = `
            SELECT user_name, id, phone_no,email,user_role 
            FROM users
            WHERE email = '${email}'
            AND password = crypt('${password}', password) `;
      const foundEmail = await client.query(checkEmailAndPassword).catch(error=> console.log(error));
      if (!foundEmail.rows[0]) {
        return res.status(400).json({
          status: 'error',
          message: 'email or password is incorrect'
        });
      }
      const token = await jwt.sign(foundEmail.rows[0], process.env.SECRET, { expiresIn: 86400 });
      
      const user = { user_name: "", id: "", phone_no: "", email: ""}  
      user.user_name =foundEmail.rows[0].user_name;
      user.id=foundEmail.rows[0].id;
      user.phone_no= foundEmail.rows[0].phone_no;
      user.email = foundEmail.rows[0].email
      return res.status(201).json({
        status: 'success',
        data: {
          token
        },
        message: 'login successful'
      });
    } catch (error) {
    return  serverMessage(res, 'fail', error.message, 500);
    }
  }

  /**
 * it get a  user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
static async getUser(req, res) {
  try {
    //const { username } = req.body;
    const token = await tokens(req);
    const checkUserQuery = `
          SELECT id, user_name, phone_no,email 
          FROM users
          WHERE users.id = '${token.id}'`;

    let foundUser = await client.query(checkUserQuery);
    if (!foundUser.rows[0]) {
      return res.status(400).json({
        status: 'error',
        message: 'user not found'
      });
    }
     foundUser = foundUser.rows[0];
    return res.status(200).json({
      status: 'success',
      data: {
        foundUser
      },
      message: 'User successfully retrieved'
    });
    } catch (error) {
        return serverMessage(res, 'fail', error.message, 500);
      }
  }

/**
 * it update a  user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
static async updateUser(req, res) {
  try {
    const { user_name,phone_no,email } = req.body;
    const token = await tokens(req);

    const checkUserQuery = `
          SELECT id,user_name,
          phone_no,
          email 
          FROM users
          WHERE users.id = '${token.id}' `;
          
    let foundUser = await client.query(checkUserQuery);

    if (!foundUser.rows[0]) {
      return res.status(400).json({
        status: 'error',
        message: 'user not found'
      });
    }
    const mergedUser = {...foundUser.rows[0], ...req.body
    }

    const updatedUserQuery = `
      UPDATE users
      SET
      user_name = '${mergedUser.user_name}',
      phone_no = '${mergedUser.phone_no}',
      email = '${mergedUser.email}'
      WHERE users.id = '${token.id}'
      returning user_name, phone_no, email
    `;

    let updatedUser = await client.query(updatedUserQuery)

     updatedUser = updatedUser.rows[0];
    return res.status(200).json({
      status: 'success',
      data: {
        updatedUser
      },
      message: 'User successfully updated'
    });
    } catch (error) {
        return serverMessage(res, 'fail', error.message, 500);
      }
  }
}

export default usersController;