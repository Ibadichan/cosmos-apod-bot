require('dotenv').config();

const { CronJob } = require('cron');
const sendApodToTelegram = require('../tasks/send-apod-to-telegram');

const {
  CRON_TIMEZONE,
  CRON_INTERVAL,
} = process.env;

const job = new CronJob(
  CRON_INTERVAL,
  sendApodToTelegram,
  // `onComplete` callback
  null,
  // `start` option
  false,
  CRON_TIMEZONE,
);

job.start();
