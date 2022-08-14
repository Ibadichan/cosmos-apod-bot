require('dotenv').config();

const { CronJob } = require('cron');
const sendApod = require('../services/send-apod');

const {
  CRON_TIMEZONE,
  CRON_INTERVAL,
} = process.env;

const job = new CronJob(
  CRON_INTERVAL,
  sendApod,
  // `onComplete` callback
  null,
  // `start` option
  false,
  CRON_TIMEZONE,
);

job.start();
