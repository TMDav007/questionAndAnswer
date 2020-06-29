import userController from '../controller/userController';
import AdminController from '../controller/adminController';
import QuestionsController from '../controller/questionsController';

const {
  signUp, login
} = userController;

const {
  getAllUsers, deleteAUser
} = AdminController;

const {
  createAQuestion, getAllQuestions, getAllQuestionsByAUser, deleteAQuestion,updateAQuestion
} = QuestionsController


const routes = (app) => {
  app.get('', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Question and Answer App, add "/api/v1/" to use the api'
    })
  );

  app.get('/api/v1/', (req, res) =>
    res.status(200).send({
      message: 'to view api, add /questions'
    })
  );

  app.post('/api/v1/auth/signup', signUp);  
  app.post('/api/v1/auth/login', login);  

  app.get('/api/v1/users/getAllUsers', getAllUsers);

  app.delete('/api/v1/users/deleteAUser/:userId', deleteAUser);

  app.post('/api/v1/questions', createAQuestion);
  app.get('/api/v1/questions', getAllQuestions);
  app.get('/api/v1/questions/user', getAllQuestionsByAUser);
  app.put('/api/v1/questions/:questionId', updateAQuestion);

  app.delete('/api/v1/questions/:questionId', deleteAQuestion);

};

export default routes;