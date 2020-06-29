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

export default {
  getAUserQuestionQuery
}