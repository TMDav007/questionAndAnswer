import questionsController from '../dummyController/questionsController'


const {
getAllQuestions
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

}

export default routes;