const axios = require('axios');

async function fetchApod() {
  let response;

  try {
    response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_TOKEN,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return response;
}

module.exports = fetchApod;
