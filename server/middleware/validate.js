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
      question: 'required|min:10',
      date: 'required|date'
  },

  questionErrorMessage: {
      question: 'the question is required|the question should have a minimum of 10 charaters',
      date: 'date should be valid with the format YYYY-MM-DD'
  },
  commentRules : { 
      comment: 'required'
  },

  commentErrorMessage: {
      comment: 'the comment is required'
  },
  signUpRules: {
      username: 'required|min:6|alpha',
      email: 'required|email',
      password: 'required|min:7|alpha_dash|confirmed',
      password_confirmation: 'required',
  },
  signUpErrorMessage: {
    username: 'the user name is required| the username should have a minimum of 6 charaters| the username should be an alphabet',
    email: 'the email is required|the email must be valid',
    password: 'the password id required| the password length should have a minimum of 7| the password contain alphabet, numbers and special characters | you need to confirm your password',
    password_confirmation: 'pass confirmation is required' 
  },
  loginRules: {
    email: 'required|email',
    password: 'required|min:3',
  },

  loginErrorMessage: {
    email: 'the email is required|the email must be valid',
    password: 'the password required| the password length should have a minimum of 3'
  },

}



