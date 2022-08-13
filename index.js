require('dotenv').config();

const apodJob = require('./cron/apod-job');

apodJob.start();
