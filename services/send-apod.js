const sendApodToTelegram = require('./send-apod-to-telegram');
const parseApod = require('../parsers/apod');

async function sendApod() {
  const apod = await parseApod();

  return Promise.all([
    sendApodToTelegram(apod),
  ]);
}

module.exports = sendApod;
