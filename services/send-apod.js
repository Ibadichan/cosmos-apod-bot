const fetchApod = require('../api/fetch-apod');
const sendApodToTelegram = require('./send-apod-to-telegram');

async function sendApod() {
  const apod = await fetchApod();

  if (!apod?.data) {
    throw new Error('An error occured while fetching APOD.');
  }

  return Promise.all([
    sendApodToTelegram(apod.data),
  ]);
}

module.exports = sendApod;
