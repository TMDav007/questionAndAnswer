import questionsController from '../dummyController/questionsController'
import userController from '../controller/userController';

const {
  signUp
} = userController;

const {
getAllQuestions, getAQuestion,addAQuestion,
addAComment,deleteAQuestion,editAQuestion,
editAComment,deleteAComment
} = questionsController;

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

  app.get('/api/v1/questions', getAllQuestions);
  app.get('/api/v1/questions/:id', getAQuestion);

  app.post('/api/v1/questions', addAQuestion);
  app.post('/api/v1/questions/:questionId/answers', addAComment);

  app.put('/api/v1/questions/:questionId', editAQuestion);
  app.put('/api/v1/questions/:questionId/answers/:commentId', editAComment);

  app.delete('/api/v1/questions/:questionId', deleteAQuestion);
  app.delete('/api/v1/questions/:questionId/answers/:commentId', deleteAComment);


}

export default routes;