import userController from '../controller/userController';
import AdminController from '../controller/adminController';

const {
  signUp, login
} = userController;

const {
  getAllUsers, deleteAUser
} = AdminController;


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

};

export default routes;