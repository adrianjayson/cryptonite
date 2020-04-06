const axios = require('axios');
const colors = require('colors');
const Table = require('cli-table');

class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.nomics.com/v1/currencies/ticker";
        this.table = new Table({
            head: ['', 'Price'.cyan, 'Market Cap'.cyan, 'Volume'.cyan]
        //   , colWidths: [100, 200]
        });
    }

    async getCoinData(coinOption, curOption) {
        try {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: curOption
            });

            const res = await 
                axios.get(`${this.baseUrl}?key=${this.apiKey}&ids=${coinOption}&convert=${curOption}`);

            let output = '';

            if (res.data.length > 1) {
                output = this.multipleCoinsTable(res, curOption);
            } else {
                output = this.singleCoinTable(res, curOption, true);
            }

            

            return output;
        } catch (err) {
            // this.handleAPIError(err);
            console.error(err);
        }
    }

    handleAPIError(err) {
        if (err.response.status === 401) {
            throw new Error("Your API Key is invalid. Request at https://p.nomics.com/cryptocurrency-bitcoin-api .");
        } else if (err.response.status === 404) {
            throw new Error("The API Key is currently unavailable. Please try again later.");
        } else {
            throw new Error("Something went wrong. Please try again later.");
        }
    }

    formatPercentage(val) {
        return parseFloat(val * 100).toFixed(2) + '%';
    }

    multipleCoinsTable(res, cur) {
        const moneyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: cur
        });

        const numFormatter = new Intl.NumberFormat();

        const table = new Table({
            head: ['', 'Price'.cyan, 'Market Cap'.cyan, 'Volume'.cyan]
        });
        res.data.forEach(coin => {
            table.push([`${coin.name} (${coin.symbol})`,
                        `${moneyFormatter.format(coin.price)} (${this.formatPercentage(coin['1d'].price_change_pct)})`[coin['1d'].price_change_pct >= 0 ? 'green' : 'red'],
                        `${moneyFormatter.format(coin.market_cap)}`,
                        `${numFormatter.format(coin['1d'].volume)} (${this.formatPercentage(coin['1d'].volume_change_pct)})`[coin['1d'].volume_change_pct >= 0 ? 'green' : 'red']])
        });

        return table.toString();
    }

    singleCoinTable(res, cur, verbose) {
        const moneyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: cur
        });
        const numFormatter = new Intl.NumberFormat();

        const table = new Table();

        if(!verbose) {
            res.data.forEach(coin => {
                table.push({"": `${coin.name} (${coin.symbol})`},
                        {['Price'.cyan]: `${moneyFormatter.format(coin.price)} (${this.formatPercentage(coin['1d'].price_change_pct)})`[coin['1d'].price_change_pct >= 0 ? 'green' : 'red']},
                        {["Market Cap".cyan]: `${moneyFormatter.format(coin.market_cap)}`},
                        {["Volume".cyan]: `${numFormatter.format(coin['1d'].volume)} (${this.formatPercentage(coin['1d'].volume_change_pct)})`[coin['1d'].volume_change_pct >= 0 ? 'green' : 'red']})
            });
        } else {
            res.data.forEach(coin => {
                table.push({"": `${coin.name} (${coin.symbol})`},
                        {["Rank".cyan]: `${coin.rank}`},
                        {['Price'.cyan]: `${moneyFormatter.format(coin.price)}`},
                        {['Price Change'.cyan]: `${moneyFormatter.format(coin['1d'].price_change)}`[coin['1d'].price_change >= 0 ? 'green' : 'red']},
                        {['Price Change %'.cyan]: `${this.formatPercentage(coin['1d'].price_change_pct)}`[coin['1d'].price_change_pct >= 0 ? 'green' : 'red']},
                        {["Market Cap".cyan]: `${moneyFormatter.format(coin.market_cap)}`},
                        {['Market Cap Change'.cyan]: `${moneyFormatter.format(coin['1d'].market_cap_change)}`[coin['1d'].market_cap_change >= 0 ? 'green' : 'red']},
                        {['Market Cap Change %'.cyan]: `${this.formatPercentage(coin['1d'].market_cap_change_pct)}`[coin['1d'].market_cap_change_pct >= 0 ? 'green' : 'red']},
                        {["Volume".cyan]: `${moneyFormatter.format(coin['1d'].volume)}`},
                        {['Volume Change'.cyan]: `${moneyFormatter.format(coin['1d'].volume_change)}`[coin['1d'].volume_change >= 0 ? 'green' : 'red']},
                        {['Volume Cap Change %'.cyan]: `${this.formatPercentage(coin['1d'].volume_change_pct)}`[coin['1d'].volume_change_pct >= 0 ? 'green' : 'red']},
                        {["Circulating Supply".cyan]: `${numFormatter.format(coin.circulating_supply)}`},
                        {["Max Supply".cyan]: `${numFormatter.format(coin.max_supply)}`})
            });
        }

        return table.toString();
    }
}

module.exports = CryptoAPI;