import utils from './../utils/index';
import error from './../utils/errorMessage';

const { pgConnect } = utils;
const { errorMessage } = error;
const client = pgConnect();
client.connect();

/**
 * it is a class that control all event method
 */
class AdminController {
  /**
   * @desc it get all users
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} get all users
   */

   static async getAllUsers(req, res) {
    try {
      const getAllUsersQuery = `
          SELECT 
          user_name, email
          FROM users
      `;

      const allUsers = await client.query(getAllUsersQuery);

      return res.status(200).json({
        status: 'success',
        data: {
          allUsers: allUsers.rows
        }
      });

    } catch (error) {
        errorMessage(res, 'fail', error.message, 500);
    }
  }

}

export default AdminController;