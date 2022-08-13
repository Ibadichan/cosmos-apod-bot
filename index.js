require('dotenv').config();

// const apodJob = require('./cron/apod-job');

// apodJob.start();

const sendApodToTelegram = require('./tasks/send-apod-to-telegram');

setInterval(() => {
  sendApodToTelegram();
}, 1000 * 30);

