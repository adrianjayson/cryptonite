#!/usr/bin/env node
// do sudo npm link to link this as a command.
const program = require('commander');
const pkg = require('../package.json');

// console.log(process.argv[2]);
program
    .version(pkg.version)
    .command('key', 'Manage API Key -- https://nomics.com')
    .command('coin', 'Inquire cryptocurrency prices and other stats.')
    .parse(process.argv);