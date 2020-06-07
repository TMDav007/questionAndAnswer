import questions from '../dummyModel/question';
import dummyControllerFunction from './dummyControllerFunction';
import serverMessages from '../dummyController/serverMessage';

const {
  checkForAdmin, getUser, checkName, checkForRequest, removeElement,checkInput
} = dummyControllerFunction;

const { serverMessage } = serverMessages;

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
      return serverMessage(res, 'error', 'you dont have the priviledge for this request', 403);
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
      return serverMessage(res, 'error', 'question not found', 404);
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
      if (!checkInput(id)) {
      return serverMessage(res, 'error','input must be an integer', 400);
      }
    
  
    // get a question
    const newQuestion = questions.filter(question => question.id === parseInt(id, 10));

    // if question is not found
    if (newQuestion.length === 0) {
      return serverMessage(res, 'error', 'question not found', 404);
    }
    // get user in users db
    const user = getUser(newQuestion);

    // check if user not found exist in user db
    if (!user) {
      return serverMessage(res, 'error', 'user not found in the database', 404);
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

    if (!checkInput(questionId)) {
      return serverMessage(res, 'error','input must be an integer', 400);
    }

  // get a question
  const newQuestion = questions.filter(question => question.id === parseInt(questionId, 10));

  // if question is not found
  if (newQuestion.length === 0) {
    return serverMessage(res, 'error', 'question not found', 404);
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

    /**
   * it Delete a question
   * @param {string} req
   * @param {string} res
   * @returns {object} Delete a question
   */
  static deleteAQuestion(req, res) {
    const { questionId }= req.params

    if (!checkInput(questionId)) {
      return serverMessage(res, 'error','input must be an integer', 400);
    }

  // get a question
  const newQuestion = questions.filter(question => question.id === parseInt(questionId, 10));

  // if question is not found
  if (newQuestion.length === 0) {
    return serverMessage(res, 'error','question not found', 404);
  }

  //delete question
    removeElement(questions,questionId);

    return serverMessage(res, 'success','question was deleted', 201);
  }

      /**
   * it edits a question
   * @param {string} req
   * @param {string} res
   * @returns {object} edit a question
   */
  static editAQuestion(req, res) {
    const { questionId }= req.params

    if (!checkInput(questionId)) {
      return serverMessage(res, 'error','input must be an integer', 400);
    }

  // get a question
  const updateQuestion = questions.filter(question => question.id === parseInt(questionId, 10));

  // if question is not found
  if (updateQuestion.length === 0) {
    return serverMessage(res, 'error','question not found', 404);
  }

  const { question } = req.body;

  updateQuestion[0].question = question || updateQuestion[0].question;

  return serverMessage(res, 'success','Question updated successfully', 201);
  }

    /**
   * it edit a comment
   * @param {string} req
   * @param {string} res
   * @returns {object} edit a comment
   */
  static editAComment(req, res) {
    const { questionId, commentId }= req.params
    const {  answer, like} = req.body;

    if (!checkInput(questionId)) {
      return serverMessage(res, 'error','input must be an integer', 400);
    }

  // get a question
  const newQuestion = questions.filter(question => question.id === parseInt(questionId, 10));

  // if question is not found
  if (newQuestion.length === 0) {
    return serverMessage(res, 'error', 'question not found', 404);
  }

  const updateComment = newQuestion[0].answers.filter(answer => answer.id === parseInt(commentId, 10));

   // if comment is not found
   if (updateComment[0].length === 0) {
    return serverMessage(res, 'error', 'comment not found', 404);
  }

    updateComment[0].answer = answer || updateComment[0].answer;
    updateComment[0].like = like || updateComment[0].like;

    return serverMessage(res, 'success','Comment updated successfully', 201);
  }

     /**
   * it deletes a comment
   * @param {string} req
   * @param {string} res
   * @returns {object} delete a comment
   */
  static deleteAComment(req, res) {
    const { questionId, commentId }= req.params

    if (!checkInput(questionId)) {
      return serverMessage(res, 'error','input must be an integer', 400);
    }

  // get a question
  const newQuestion = questions.filter(question => question.id === parseInt(questionId, 10));

  // if question is not found
  if (newQuestion.length === 0) {
    return serverMessage(res, 'error', 'question not found', 404);
  }

  const updateComment = newQuestion[0].answers.filter(answer => answer.id === parseInt(commentId, 10));

   // if comment is not found
   if (updateComment[0].length === 0) {
    return serverMessage(res, 'error', 'comment not found', 404);
  }

  //delete comment
  removeElement(newQuestion[0].answers,commentId);

    return serverMessage(res, 'success','Comment deleted successfully', 201);
  }
}

export default questionsController;