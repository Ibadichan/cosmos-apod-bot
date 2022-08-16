const TelegramBot = require('node-telegram-bot-api');

const {
  TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID,
} = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function sendApodToTelegram(apod) {
  const {
    copyright,
    date,
    explanation,
    hdurl,
    media_type,
    title,
    url,
  } = apod;

  const src = hdurl || url;

  const caption = `<strong>${title} (${date})</strong>\n<em>Автор и права: ${copyright || '-'}</em>`;

  if (media_type === 'image') {
    await bot.sendPhoto(TELEGRAM_CHAT_ID, src, {
      caption,
      parse_mode: 'HTML',
      disable_notification: true,
    });
  } else if (media_type === 'video') {
    if (src.includes('youtube')) {
      const videoId = new URL(src).pathname.split('/').pop();

      await bot.sendMessage(TELEGRAM_CHAT_ID, `${caption}\nhttps://www.youtube.com/watch?v=${videoId}`, {
        parse_mode: 'HTML',
        disable_notification: true,
      });
    } else {
      await bot.sendVideo(TELEGRAM_CHAT_ID, src, {
        caption,
        parse_mode: 'HTML',
        disable_notification: true,
      });
    }
  }

  await bot.sendMessage(TELEGRAM_CHAT_ID, `<strong>Пояснение:</strong> <tg-spoiler>${explanation}</tg-spoiler>`, {
    parse_mode: 'HTML',
    disable_notification: true,
  });
}

module.exports = sendApodToTelegram;
