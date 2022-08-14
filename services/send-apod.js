const sendApodToTelegram = require('./send-apod-to-telegram');

async function sendApod() {
  return Promise.all([
    sendApodToTelegram(),
  ]);
}

module.exports = sendApod;
