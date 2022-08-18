require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const sendApod = require('./services/send-apod');

const isProduction = process.env.NODE_ENV === 'production';

async function runApplication() {
  const app = express();

  const port = process.env.PORT || 3000;
  const host = process.env.LISTEN_HOST || '127.0.0.1';

  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');

  app.use(morgan(isProduction ? 'combined' : 'dev'));

  app.use(express.urlencoded({
    extended: true,
  }));

  app.get('/', (req, res) => {
    res.send('Hello from APOD Bot!');
  });

  app.post('/send-apod', async (req, res) => {
    try {
      await sendApod();

      res.json({
        code: 'OK',
        message: 'APOD was successfully sent.',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      res.status(400);

      res.json({
        code: 'ERROR',
        message: 'An error occured while sending APOD.',
      });
    }
  });

  app.listen({ port, host }, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${host}:${port}`);
  });
}

runApplication();
