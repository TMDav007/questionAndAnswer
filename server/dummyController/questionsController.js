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

   /**
   * it GET a question
   * @param {string} req
   * @param {string} res
   * @return {object} an object
   */
    static getAQuestion(req, res) {
      const { id } = req.params;
      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
          status: 'error',
          message: 'Input must be an integer'
        });
      }

    // get a question
    const newQuestion = questions.filter(question => question.id === parseInt(id, 10));

    // if question is not found
    if (newQuestion.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'question not found'
      });
    }
    // get user in users db
    const user = getUser(newQuestion);

    // check if user not found exist in user db
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'user not found in the database'
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          questions: newQuestion
        }
      });
    }
  }

    /**
   * it ADD a question
   * @param {string} req
   * @param {string} res
   * @returns {obiect} add question
   */
  static addAQuestion(req, res) {
    const id = questions.length + 1;
    const {
     username, question, date
    } = req.body;

    const newQuestion = {
      id, username, question, numberOfAnswers: 0, answers: [], date
    };
    questions.push(newQuestion);
    res.status(201).json({
      status: 'success',
      data: {
        question: newQuestion
      }
    });
  }

  /**
   * it ADD a comment
   * @param {string} req
   * @param {string} res
   * @returns {object} add a comment
   */
  static addAComment(req, res) {
    const { questionId }= req.params

    if (!Number.isInteger(Number(questionId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Input must be an integer'
      });
    }

  // get a question
  const newQuestion = questions.filter(question => question.id === parseInt(questionId, 10));

  // if question is not found
  if (newQuestion.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'question not found'
    });
  }

  newQuestion[0].numberOfAnswers++;

    const {
     username, answer, like
    } = req.body;

    const newAnswer = {
     id: newQuestion[0].answers.length+1, username, answer, like
    };

    newQuestion[0].answers.push(newAnswer);
    res.status(201).json({
      status: 'success',
      data: {
        answer: newQuestion
      }
    });
  }
}

export default questionsController;