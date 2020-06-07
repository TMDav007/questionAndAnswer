import users from './../dummyModel/users';
import questions from './../dummyModel/question';

const checkForAdmin = () => {
  const admin = users.filter(user => user.role === 'admin');
  // check if user is admin to get all request
  if (admin.length !== 0) {
    return admin;
  }
};

const checkForRequest = (id) => {
  const foundRequest = requests.filter(request => request.id === id);
  // check if user is admin to get all request
  if (foundRequest.length !== 0) {
    return foundRequest[0];
  }
};

const getUser = (question) => {
  const foundUser = users.some(user => user.username === question[0].username);
  return foundUser;
};

const checkName = (name) => {
  const foundName = requests.some(request => request.name === name);
  return foundName;
};

const checkInput = (input) => {
  if (Number.isInteger(Number(input))) {
    return true
  }
}

const removeElement = (elements, elementId,) => {
  elements.splice(elementId - 1, 1);
}

export default {
  checkForAdmin, getUser, checkName, checkForRequest, removeElement, checkInput
};