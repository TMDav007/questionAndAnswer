import utils from "./../utils/index";
import error from './../utils/errorMessage';
import middleware from './../middleware/validate';
import query from './../utils/query';

const { pgConnect, tokens } = utils;

const { serverMessage } = error;
const { checkInput } = middleware;


const {getAUserQuestionQuery, getACommentQuery, modifyAQuestionQuery, getACommentByAUserQuery,modifyACommentQuery, createACommentQuery, getCommentsByQuestionQuery,getAQuestionQuery } = query;


const client = pgConnect();
client.connect();

let token;

/**
 * it is a class that control all a questions method
 */
class CommentsController {
  /**
   * @desc it creates a question
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async createAComment(req, res) {
    try {
      const { comment, questionId } = req.body;
      const updateQuestionProperty = {  no_of_answers: '' };
      token = await tokens(req)

      if (!checkInput(questionId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }
      const foundQuestion = await client.query(getAQuestionQuery(questionId));

      if (foundQuestion.rows.length < 1) {
      return  serverMessage(res, 'fail', 'question does not exist', 404);
      }

      // update no of comments in questions table
      // get all comments by a question
      const foundCommentsByQuestion = await client.query(getCommentsByQuestionQuery(questionId));

    const createdComment = await client.query(createACommentQuery(comment,token.id,questionId));

    // modify the no of comments in questions table
    updateQuestionProperty.no_of_answers = foundCommentsByQuestion.rows.length;
    const mergedNoOfComments= { ...foundQuestion.rows[0], ...updateQuestionProperty };
    
    const updatedQuestion = await client.query(modifyAQuestionQuery(mergedNoOfComments.question,mergedNoOfComments.no_of_answers, questionId, token.id));
    return res.status(201).json({
      status: 'success',
      data: {
        newQuestion: createdComment.rows[0]
      }
    });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }


    /**
   * @desc it gets all comments by a question
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async getAllCommentsByAQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const token = await tokens(req);

      if (!checkInput(questionId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

      const getAllQuestionsByACommentQuery = `
          SELECT 
          comment, id
          FROM comments
          WHERE comments.question_id = '${questionId}';
      `;  
      const allcomments = await client.query(getAllQuestionsByACommentQuery);
      if (allcomments.rows.length < 1) {
        return  serverMessage(res, 'fail', 'comment does not exist for this question', 404);
        }

      return res.status(201).json({
        status: 'success',
        data: {
          Comments: allcomments.rows
        }
      });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }

      /**
   * @desc it gets a comment
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async getAComment(req, res) {
    try {
      const { commentId } = req.params;
      const token = await tokens(req);

      if (!checkInput(commentId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

      const allcomments = await client.query(getACommentQuery(commentId));

      if (allcomments.rows.length < 1) {
        return  serverMessage(res, 'fail', 'comment not found', 404);
        }


      return res.status(201).json({
        status: 'success',
        data: {
          Comments: allcomments.rows
        }
      });
    } catch (error) {
      serverMessage(res, 'fail', error.message, 500);
    }
  }


  /**
   * @desc it deletes a comment
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async deleteAComment(req, res) {
    try {
      const { commentId } = req.params;
      const token = await tokens(req);


      if (!checkInput(commentId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

      const deleteACommentQuery = `
        DELETE from comments
        WHERE comments.id = '${commentId}'
        AND comments.users_id = '${token.id}';
      `;
    
    const foundComment = await client.query(getACommentQuery(commentId));

      if (foundComment.rows.length < 1) {
      return  serverMessage(res, 'fail', 'comment does not exist', 404);
      }

      await client.query(deleteACommentQuery);

    return serverMessage(res, 'success', 'comment deleted successfully', 200);

    } catch (error) {
     return serverMessage(res, 'fail', error.message, 500);
    }
  }

        /**
   * @desc it modifies a comment
   *
   * @param {string} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async updateAComment(req, res) {
    try {
      const { commentId } = req.params;
      const { comment, likes } = req.body;
      const token = await tokens(req);

      if (!checkInput(commentId)) {
        return serverMessage(res, 'error','input must be an integer', 400);
      }

      const foundComment = await client.query(getACommentByAUserQuery(commentId, token.id));

      if (foundComment.rows.length < 1) {
      return  serverMessage(res, 'fail', 'comment not found', 404);
      }

    const mergedComment= { ...foundComment.rows[0], ...req.body };

    const updatedComment = await client.query(modifyACommentQuery(mergedComment.comment, mergedComment.likes, commentId, token.id));

    return res.status(200).json({
      status: 'success',
      data: {
        comment: updatedComment.rows[0]
      }
    });

    } catch (error) {
     return serverMessage(res, 'fail', error.message, 500);
    }
  }


}

export default CommentsController;