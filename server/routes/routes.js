import userController from '../controller/userController';
import AdminController from '../controller/adminController';
import QuestionsController from '../controller/questionsController';
import CommentsController from '../controller/commentsController';
import Middleware from '../middleware/middleware';

const {
  signUp, login
} = userController;

const {
  getAllUsers, deleteAUser
} = AdminController;

const {
  createAQuestion, getAllQuestions, getAllQuestionsByAUser, deleteAQuestion,updateAQuestion
} = QuestionsController;

const { createAComment, getAComment, getAllCommentsByAQuestion,deleteAComment,updateAComment} = CommentsController;

const { authenicateUser, authenicateAdmin, checkMail, checkUsername, validateSignUp, validateLogin, validateQuestion, validateComment } = Middleware;


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

  app.post('/api/v1/auth/signup',validateSignUp, checkUsername, checkMail,signUp);  
  app.post('/api/v1/auth/login',validateLogin, login);  

  app.get('/api/v1/users/getAllUsers',authenicateAdmin, getAllUsers);
  app.delete('/api/v1/users/deleteAUser/:userId',authenicateAdmin, deleteAUser);

  app.post('/api/v1/questions',authenicateUser,validateQuestion, createAQuestion);
  app.get('/api/v1/questions',authenicateUser, getAllQuestions);
  app.get('/api/v1/questions/user',authenicateUser, getAllQuestionsByAUser);
  app.put('/api/v1/questions/:questionId',authenicateUser, updateAQuestion);
  app.delete('/api/v1/questions/:questionId',authenicateUser, deleteAQuestion);

  app.post('/api/v1/comments',authenicateUser, validateComment, createAComment);
  app.get('/api/v1/comments/:questionId',authenicateUser, getAllCommentsByAQuestion);
  app.get('/api/v1/comment/:commentId',authenicateUser, getAComment);
  app.put('/api/v1/comments/:commentId', authenicateUser,updateAComment);
  app.delete('/api/v1/comments/:commentId',authenicateUser, deleteAComment);

};

export default routes;