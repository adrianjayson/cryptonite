const KeyManager = require('../lib/KeyManager');
const CryptoAPI = require('../lib/CryptoAPI');

const coin = {
    update: async (options) => {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();
            const cryptoApi = new CryptoAPI(key);

            const coinData = await cryptoApi.getCoinData(options);

            console.log(coinData);
        } catch (error) {
            console.error(error.message.red);
        }
    }
}

module.exports = coin;