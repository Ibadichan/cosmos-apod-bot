const TelegramBot = require('node-telegram-bot-api');
const fetchApod = require('../api/fetch-apod');

const {
  TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID,
} = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function sendApodToTelegram() {
  const apod = await fetchApod();

  if (!apod?.data) {
    await bot.sendMessage(TELEGRAM_CHAT_ID, 'При получении APOD произошла ошибка, приносим свои извинения.');
    return;
  }

  const {
    copyright,
    date,
    explanation,
    hdurl,
    media_type,
    title,
    url,
  } = apod.data;

  const src = hdurl || url;

  const caption = `<strong>${title} (${date})</strong>\n<em>Автор и права: ${copyright || '-'}</em>`;

  if (media_type === 'image') {
    await bot.sendPhoto(TELEGRAM_CHAT_ID, src, {
      caption,
      parse_mode: 'HTML',
    });
  } else if (media_type === 'video') {
    await bot.sendVideo(TELEGRAM_CHAT_ID, src, {
      caption,
      parse_mode: 'HTML',
    });
  }

  await bot.sendMessage(TELEGRAM_CHAT_ID, `<strong>Пояснение</strong>: ${explanation}`, {
    parse_mode: 'HTML',
  });
}

module.exports = sendApodToTelegram;
