import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes';
import path from 'path';
import babelPolyfill from 'babel-polyfill';


const app = express();
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({ type: 'application/json'}));

routes(app);

if (process.env.NODE_ENV !== 'development' || process.env.NODE_ENV !== 'test') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

routes(app);
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
  console.log('we are running live');
});

export default app;