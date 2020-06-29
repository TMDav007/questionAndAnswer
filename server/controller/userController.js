import jwt from 'jsonwebtoken';

import utils from './../utils/index'
import error from './../utils/errorMessage';

const { pgConnect } = utils;

const client = pgConnect();
client.connect();

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
      const {
        username, email, password } = req.body;

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
          ) RETURNING *;
        `;

      const result = await client.query(createUser);
      return res.status(201).json({
        status: 'success',
        data: {
          newUser: result.rows[0]
        },
        message: 'user created successfully'
      });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
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
    const {
      email, password
    } = req.body;

    const checkEmailAndPassword = `
          SELECT * 
          FROM users
          WHERE email = '${email}'
          AND password = crypt('${password}', password)
    `;

    const foundEmail = await client.query(checkEmailAndPassword);
    if (!foundEmail.rows[0]) {
      return res.status(400).json({
        status: 'error',
        message: 'email or password is incorrect'
      });
    }
    const token = await jwt.sign(foundEmail.rows[0], process.env.SECRET, { expiresIn: 86400 });

    return res.status(200).json({
      status: 'success',
      data: {
        token
      },
      message: 'login successful'
    });
  } catch (error) {
    serverMessage(res, 'fail', error.message, 500);
  }
}


}

export default usersController;