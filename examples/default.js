const { getCryptoRates, getCryptoRate, loadMarketData } = require('crypto-exchange-rates');

async function loadCryptoRates() {
    try {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'LTCBTC', 'XRPUSDT'];
        const cryptoRates = await getCryptoRates(symbols);
        console.log(cryptoRates);

        const symbol = 'BTCUSDT';
        const cryptoRate = await getCryptoRate(symbol);
        console.log(cryptoRate);

        const marketData = await loadMarketData();
        console.log(marketData);
    } catch (e) {
        throw new Error(e.message);
    }
}

loadCryptoRates();