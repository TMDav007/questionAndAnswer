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
 * @desc query to get a user's question
 * 
 * @param {integer} condition1 
 * 
 * @return {string} query
 */

const getAQuestionQuery = (condition1) => {
  const query = `
    SELECT 
    questions.id,
    questions.question,
    questions.no_of_answers,
    questions.date
    FROM questions, user
    WHERE questions.id = ${condition1};
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
 * @desc query to get a comment by question query
 * 
 * @param {integer} condition1 
 * 
 * @return {string} query
 */

const getCommentsByQuestionQuery = (value) => {
  const query = `
      SELECT 
      comment, id
      FROM comments
      WHERE comments.question_id = '${value}';
  `; 
  return query;
}

/**
 * @desc query check if mail exist
 * 
 * @param {string} condition1 
 * @param {string} condition2
 * 
 * @return {string} query
 */

const checkMail = (value1, value2) => {
  const query = `
      SELECT * 
      FROM users
      WHERE ${value1} = '${value2}';
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
 * @param {string} table
 * @param {string} key1
 * @param {string} key2
 * @param {string} key3
 * @param {string} key4
 * @param {int} value1 
 * @param {int} value2 
 * @param {int} value3 
 * @param {int} value4
 * 
 * @return {obj} query
 */
const modifyARequestQuery = (table, key1, value1, key2, value2, key3, value3, key4, value4) => {
  const query =  `
          UPDATE ${table}
          SET
          ${key1} = '${value1}',
          ${key2} = '${value2}'
          WHERE ${key3} = '${value3}'
          AND ${key4} = '${value4}'
          returning *;
          `;
  return query;
}

/**
 * @desc query to create a question 
 * 
 * @param {int} value1 
 * @param {int} value2 
 * @param {int} value3 
 * 
 * @return {obj} query
 */

const createACommentQuery = (value1, value2, value3) => {
  const query =  `
      INSERT INTO comments(
        comment,
        users_id,
        question_id
      )
      VALUES (
        '${value1}',
        '${value2}',
        '${value3}'
      ) returning *;
          `;
  return query;
}

export default {
  getAUserQuestionQuery,
  modifyARequestQuery,
  getACommentQuery,
  getACommentByAUserQuery,
  createACommentQuery,
  getCommentsByQuestionQuery,
  getAQuestionQuery,
  checkMail
}