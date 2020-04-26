import questions from '../dummyModel/question';
import dummyControllerFunction from './dummyControllerFunction';

const {
  checkForAdmin, getUser, checkName, checkForRequest
} = dummyControllerFunction;


/**
 * it is a class that control all question api;
 */
class questionsController {
  /**
     * it GET all question
     * @param {string} req
     * @param {string} res
     * @returns {object} object
     */
  static getAllQuestions(req, res) {
    const admin = checkForAdmin();
    if (!admin) {
      return res.status(403).json({
        status: 'error',
        message: 'you dont have the priviledge for this request'
      });
    }
    // get all questions
    if (questions.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          questions
        }
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'question not found'
      });
    }
  }

}

export default questionsController;