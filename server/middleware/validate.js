/**
* @desc this checks if params is an integer
* @param {integer} input 
* 
* @return {boolean} returns a true
*/
const checkInput = (input) => {
  if (Number.isInteger(Number(input))) {
    return true
  }
}

/**
* @desc this checks if input is empty
* @param {integer} input 
* 
* @return {boolean} returns a true
*/
const isEmpty = (input) => {
    if (input === "" || input === undefined) {
      return true;
  }
}


export default {
  checkInput, isEmpty,
  questionRules : { 
      question: 'required',
      date: 'required|date'
  },

  questionErrorMessage: {
      question: 'the question is required',
      date: 'date should be valid with the format YYYY-MM-DD'
  },
  commentRules : { 
      comment: 'required'
  },

  commentErrorMessage: {
      comment: 'the comment is required'
  },
  signUpRules: {
      username: 'required|min:3|alpha',
      email: 'required|email',
      password: 'required|min:7|alpha_|confirmed',
      password_confirmation: 'required',
  },
  signUpErrorMessage: {
    username: 'the user name is required| the username should have a minimum of 3 charaters| the username should be an alphabet',
    email: 'the email is required|the email must be valid',
    password: 'the password id required| the password length should have a minimum of 7| the password contain alphabet, numbers and special characters | you need to confirm your password',
    password_confirmation: 'pass confirmation is required' 
  },
  loginRules: {
    email: 'required|email',
    password: 'required|min:7',
  },

  loginErrorMessage: {
    email: 'the email is required|the email must be valid',
    password: 'the password id required| the password length should have a minimum of 7'
  },

}



