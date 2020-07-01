/**
 * @desc this is a server message
 * 
 * @param {object} res 
 * @param {string} status 
 * @param {string} message 
 * @param {integer} statusCode 
 * 
 * @return {object} returns an server message
 */

const serverMessage = (res, status, message,statusCode) => {
  return  res.status(statusCode).json({
        status,
        message
    });
}


export default { serverMessage };