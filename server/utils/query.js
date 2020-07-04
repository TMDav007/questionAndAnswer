/**
 * @desc query to get a user's question
 * 
 * @param {integer} condition1 
 * @param {integer} condition2 
 * 
 * @return {string} query
 */

const getAUserQuestionQuery = (condition1, condition2) => {
  const query = `
    SELECT 
    questions.id,
    questions.question,
    questions.no_of_answers,
    questions.date
    FROM questions, user
    WHERE questions.id = ${condition1}
    AND questions.user_id = ${condition2};
    `;
  return query;
}

/**
 * @desc query to get a comment
 * 
 * @param {integer} condition1 
 * 
 * @return {string} query
 */

const getACommentQuery = (value) => {
  const query = `
    SELECT 
    id, comment, likes
    FROM comments
    WHERE comments.id = '${value}';
  `; 
  return query;
}

/**
 * @desc query to get a comment
 * 
 * @param {integer} condition1 
 * 
 * @return {string} query
 */

const getACommentByAUserQuery = (value1, value2) => {
  const query = `
    SELECT 
    id, comment, likes
    FROM comments
    WHERE comments.id = '${value1}'
    AND comments.users_id = '${value2}';
  `; 
  return query;
}

/**
 * @desc query to modify a question 
 * 
 * @param {int} value1 
 * @param {int} value2 
 * @param {int} value3 
 * 
 * @return {obj} query
 */
const modifyAQuestionQuery = (value1, value2, value3, value4) => {
  const query =  `
          UPDATE questions
          SET
          question = '${value1}',
          no_of_answers = '${value2}'
          WHERE questions.id = '${value3}'
          AND questions.user_id = '${value4}'
          returning *;
          `;
  return query;
}

/** 
* @desc query to modify a comment
* 
* @param {int} value1 
* @param {int} value2 
* @param {int} value3 
* 
* @return {obj} query
*/
const modifyACommentQuery = (value1, value2, value3, value4) => {
 const query =  `
         UPDATE comments
         SET
         comment = '${value1}',
         likes = '${value2}'
         WHERE comments.id = '${value3}'
         AND comments.users_id = '${value4}'
         returning *;
         `;
 return query;
}

export default {
  getAUserQuestionQuery,
  modifyAQuestionQuery,
  getACommentQuery,
  getACommentByAUserQuery,
  modifyACommentQuery
}