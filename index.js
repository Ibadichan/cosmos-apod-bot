require('dotenv').config();

// const apodJob = require('./cron/apod-job');

// apodJob.start();

const sendApodToTelegram = require('./tasks/send-apod-to-telegram');

sendApodToTelegram();
