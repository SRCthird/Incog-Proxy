const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const startApp = require('./modules/startApp.js');
const stopApp = require('./modules/stopApp.js');

const argv = yargs(hideBin(process.argv)).argv;

let config = {};
try {
  config = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
} catch (error) {
  console.error('Error reading conf.json:', error);
}

if (argv['on-start']) {
  if (config['on-start'] === 'true') {
    startApp();
  } else {
    console.log('Exiting based on "on-start" configuration');
    process.exit(0);
  }
}

if (argv.start) {
    startApp();
}

if (argv.stop) {
    stopApp();
}
