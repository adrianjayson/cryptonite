const program = require('commander');
const key = require('../commands/key');

program
    .command('set')
    .description('Set API Key provided by Nomics')
    .action(key.set);

program
    .command('get')
    .description('Get configured API Key provided by Nomics')
    .action(key.get);

program
    .command('unset')
    .description('Remove API Key provided by Nomics')
    .action(key.unset);

program.parse(process.argv);