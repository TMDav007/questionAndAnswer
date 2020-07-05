import utils from "./../utils/index";
import error from './../utils/errorMessage';
import query from './../utils/query';
import middleware from './../middleware/validate';

// import { request } from "express";

const { pgConnect, tokens } = utils;

const { serverMessage } = error;
const { checkInput } = middleware;

const {getAUserQuestionQuery, modifyAQuestionQuery} = query;

const client = pgConnect();
client.connect();

/**
 * it is a class that control all a questions method
 */
class QuestionsController {
  /**
   * @desc it creates a question
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async createAQuestion(req, res) {
    try {
      const { question, date, userId } = req.body;

      if (!checkInput(userId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

      const createAQuestionQuery = `
        INSERT INTO questions (
          question,
          date,
          user_id
        )
        VALUES (
          '${question}',
          '${date}',
          '${userId}'
        ) returning *;
      `;     
      
//      console.log(userId);
      const createdQuestion = await client.query(createAQuestionQuery);

      return res.status(201).json({
        status: 'success',
        data: {
          newQuestion: createdQuestion.rows[0]
        }
      });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }

    /**
   * @desc it gets all questions
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async getAllQuestions(req, res) {
    try {

      const getAllQuestionsQuery = `
        SELECT 
        questions.question,
        questions.no_of_answers,
        questions.date,
        user_name
        FROM questions, users
        WHERE questions.user_id = users.id
      `;      
      const allQuestions = await client.query(getAllQuestionsQuery);

      return res.status(201).json({
        status: 'success',
        data: {
          questions: allQuestions.rows
        }
      });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }

  /**
   * @desc it gets all questions by a user
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async getAllQuestionsByAUser(req, res) {
    try {

      const token = await tokens(req);

      const getAllQuestionsByAUserQuery = `
        SELECT DISTINCT
        questions.id,
        question,
        no_of_answers,
        date
        FROM questions, users
        WHERE questions.user_id = '${token.id}'
      `;      
      const allQuestions = await client.query(getAllQuestionsByAUserQuery);

      return res.status(201).json({
        status: 'success',
        data: {
          Questions: allQuestions.rows
        }
      });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }

    /**
   * @desc it deletes a question by a user
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async deleteAQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const token = await tokens(req);


      if (!checkInput(questionId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

      const deleteAQuestionQuery = `
        DELETE from questions
        WHERE questions.id = '${questionId}'
        AND questions.user_id = '${token.id}';
      `;
    
    const foundQuestion = await client.query(getAUserQuestionQuery(questionId, token.id));

      if (foundQuestion.rows.length < 1) {
      return  serverMessage(res, 'fail', 'question does not exist', 404);
      }

      await client.query(deleteAQuestionQuery);

    return serverMessage(res, 'success', 'question deleted successfully', 200);

    } catch (error) {
     return serverMessage(res, 'fail', error.message, 500);
    }
  }


      /**
   * @desc it modifies a question by a user
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async updateAQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const { question } = req.body;
      const token = await tokens(req);

      if (!checkInput(questionId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

    const foundQuestion = await client.query(getAUserQuestionQuery(questionId, token.id));

      if (foundQuestion.rows.length < 1) {
      return  serverMessage(res, 'fail', 'question does not exist', 404);
      }

    const mergedQuestion= { ...foundQuestion.rows[0], ...req.body };
    const updatedQuestion = await client.query(modifyAQuestionQuery(mergedQuestion.question, mergedQuestion.no_of_answers, questionId, token.id));

    return res.status(200).json({
      status: 'success',
      data: {
        question: updatedQuestion.rows[0]
      }
    });

    } catch (error) {
     return serverMessage(res, 'fail', error.message, 500);
    }
  }

}

export default QuestionsController;