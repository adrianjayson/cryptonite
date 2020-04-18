const inquirer = require('inquirer');
const colors = require('colors');
const KeyManager = require('../lib/KeyManager');
const { isRequired } = require('../utils/validation');

const key = {
    set: () => {
        const keyManager = new KeyManager();
        inquirer.prompt({
            type: 'input',
            name: 'key',
            message: 'Enter API Key'.green + 'https://nomics.com',
            validate: isRequired
        }).then((input) => {
            const key = keyManager.setKey(input.key);

            if(key) {
                console.log('API Key set.'.blue);
            }
        });
    },
    unset: () => {
        try {
            const keyManager = new KeyManager();
            keyManager.unsetKey();

            console.log('Key removed'.blue);

        } catch(err) {
            console.error(err.message.red);
        }
    },
}

module.exports = key;