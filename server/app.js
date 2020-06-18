import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import router from './routes';

const app = express();

const port = process.env.PORT || 2000;
const logger = debug('server');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/v1', router);

app.get('/', (req, res) => res.status(200).json({
  status: true,
  message: `Comment's API`
}));

app.use((err, req, res, next) => {
  // We log the error internaly
  logger('err > ', err);

  // Remove error's `stack` property. We don't want users to see this at the production env
  const error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500).json({
    status: false,
    error
  });
  next();
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: false,
    message: 'route is invalid'
  });
});

app.listen(port, () => logger(`Server running on port ${port}`));

export default app;

