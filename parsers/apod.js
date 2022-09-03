const jsdom = require('jsdom');

const { JSDOM } = jsdom;

function fixSpaces(str) {
  return str.replace(/\n/g, ' ').replace(/  +/g, ' ').trim();
}

async function parseApod() {
  const dom = await JSDOM.fromURL('https://apod.nasa.gov/apod');

  const { document } = dom.window;

  const date = document
    .querySelector('body > center:first-of-type p:last-of-type')
    .textContent;

  const [title, copyright] = document
    .querySelector('body > center:nth-of-type(2)')
    .innerHTML.split('<br>');

  const explanation = document
    .querySelector('body > center:nth-of-type(2) + p')
    .innerHTML;

  const iframeNode = document.querySelector('body > center:first-of-type iframe');
  const imgNode = document.querySelector('body > center:first-of-type img');

  const media_type = iframeNode ? 'video' : 'image';

  const url = iframeNode ? iframeNode.src : imgNode.src;
  const hdurl = iframeNode ? '' : imgNode.parentElement.href;

  const apod = {
    copyright: fixSpaces(copyright),
    date: `<em>${fixSpaces(date)}</em>`,
    explanation: fixSpaces(explanation.replace('<b> Explanation: </b>', '')),
    hdurl,
    media_type,
    title: fixSpaces(title),
    url,
  };

  return apod;
}

module.exports = parseApod;
