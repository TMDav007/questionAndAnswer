import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes';
import path from 'path';
import babelPolyfill from 'babel-polyfill';


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({ type: 'application/json'}));

routes(app);

app.use('/public',express.static(path.join(__dirname,'../client/public')));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
  console.log('we are running live');
});

export default app;