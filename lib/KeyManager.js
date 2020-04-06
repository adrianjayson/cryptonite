const Configstore = require('configstore');
const pkg = require('../package.json');

class KeyManager {
    constructor() {
        this.conf = new Configstore(pkg.name);
    }

    setKey(key) {
        this.conf.set('apiKey', key);
        return key;
    }

    getKey() {
        const key = this.conf.get('apiKey');

        if(!key) {
            throw new Error("API Key is not yet set. Get it at https://p.nomics.com/cryptocurrency-bitcoin-api");
        }
        
        return key;
    }

    unsetKey() {
        const key = this.conf.get('apiKey');

        if(!key) {
            throw new Error("API Key is not yet set. Get it at https://p.nomics.com/cryptocurrency-bitcoin-api");
        }
        
        this.conf.delete('apiKey');

        return;
    }
}

module.exports = KeyManager;