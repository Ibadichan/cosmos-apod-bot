require('dotenv').config();

const sendApodToTelegram = require('../tasks/send-apod-to-telegram');

sendApodToTelegram();
