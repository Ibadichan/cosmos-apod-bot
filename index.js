require('dotenv').config();

const apodJob = require('./cron/apod-job');

console.log('apodJob.start(); before');
apodJob.start();
