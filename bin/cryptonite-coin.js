const program = require('commander');
const coin = require('../commands/coin');

program
    .command('update')
    .description("Give cryptocurrency update")
    .option('--coin <string>', 'Choose a cryptocurrency, separated by commas for multiple values', 'BTC,ETH,XRP')
    .option('--cur <currency>', 'Change the currency', 'USD')
    .option('--int <string>', 'Interval of data (available 1h,1d,7d,30d,1y,ytd)', '1d')
    .option('--verbose <boolean>', 'Includes additional data (works when asking for single cryptocurrency only).', false)
    .action((options) => coin.update(options));

// program
//     .command('price')
//     .description("Inquire price of coins")
//     .option('--coin <type>', 'Choose a cryptocurrency', 'BTC,ETH,XRP,USDT,BCH')
//     .option('--cur <currency>', 'Change the currency', 'USD')
//     .action((options) => coin.update(options));

program.parse(process.argv);