import utils from './../utils/index';
import error from './../utils/errorMessage';

const { pgConnect } = utils;
const { serverMessage } = error;
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
          id, user_name, email
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
        serverMessage(res, 'fail', error.message, 500);
    }
  }

    /**
   * @desc it deletes a user
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} delete a user
   */

  static async deleteAUser(req, res) {
    try {

      const { userId } = req.params;

      const deleteAUserQuery = `
       DELETE from users 
       WHERE id = '${userId}'
      `;

      const deletedUser = await client.query(deleteAUserQuery);

      const confirmUserDeleteQuery = `
        SELECT from users
        WHERE id = '${userId}'
      `;

      const userDeleted = await client.query(confirmUserDeleteQuery);
      
      if (userDeleted.rows[0] === undefined){
        serverMessage(res, 'success', 'user deleted successfully', 200)
      }
    }
    catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }
}

export default AdminController;