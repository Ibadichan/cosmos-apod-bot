require('dotenv').config();

const { CronJob } = require('cron');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const {
  TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID,
  NASA_TOKEN,
  CRON_TIMEZONE,
  CRON_INTERVAL,
} = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function fetchApod() {
  let response;

  try {
    response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: NASA_TOKEN,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return response;
}

async function notifyChat() {
  const apod = await fetchApod();

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

  const caption = `<strong>${title} (${date})</strong>\n<em>Автор и права: ${copyright}</em>`;

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

const job = new CronJob(
  CRON_INTERVAL,
  notifyChat,
  // `onComplete` callback
  null,
  // `start` option
  false,
  CRON_TIMEZONE,
);

job.start();
