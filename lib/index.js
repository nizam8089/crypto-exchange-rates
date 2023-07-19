'use strict';

const axios = require('axios');

const binanceUrl = 'https://api.binance.com/api/v3/ticker/price';

/**
 * The getCryptoRates function is a JavaScript function that retrieves cryptocurrency rates from a
 * specified URL using the axios library and returns a promise with the response data.
 * @param [symbols] - The `symbols` parameter is an array of cryptocurrency symbols. It is an optional
 * parameter that allows you to specify which cryptocurrencies you want to get rates for. If no symbols
 * are provided, it will return rates for all available cryptocurrencies.
 * @returns The function `getCryptoRates` returns a Promise.
 */
function getCryptoRates(symbols = []) {
    return new Promise((resolve, reject) => {
        axios.get(binanceUrl, {
            params: { symbols: JSON.stringify(symbols) }
        })
            .then(response => {
                const res = response.data;
                if (res.code) {
                    resolve({ status: 'error', message: res.msg });
                } else {
                    resolve({ status: 'success', data: res });
                }
            })
            .catch(error => {
                reject({ status: 'error', message: error.message });
            });
    }).catch(error => {
        return { status: 'error', message: error.message };
    });
}

/**
 * The getCryptoRate function is a JavaScript function that makes an API request to get the rate of a
 * cryptocurrency symbol and returns a promise that resolves with the response data or rejects with an
 * error message.
 * @param symbol - The `symbol` parameter is a string that represents the cryptocurrency symbol for
 * which you want to get the rate. For example, if you want to get the rate for Bitcoin, you would pass
 * the symbol "BTC".
 * @returns The function `getCryptoRate` returns a Promise.
 */
function getCryptoRate(symbol) {
    return new Promise((resolve, reject) => {
        axios.get(binanceUrl, {
            params: { symbol }
        })
            .then(response => {
                const res = response.data;
                if (res.code) {
                    resolve({ status: 'error', message: res.msg });
                } else {
                    resolve({ status: 'success', data: res });
                }
            })
            .catch(error => {
                reject({ status: 'error', message: error.message });
            });
    }).catch(error => {
        return { status: 'error', message: error.message };
    });
}

/**
 * The function loadMarketData makes an HTTP GET request to a Binance URL and returns a promise that
 * resolves with the market data if the request is successful, or rejects with an error message if the
 * request fails.
 * @returns The function loadMarketData is returning a Promise object.
 */
function loadMarketData() {
    return new Promise((resolve, reject) => {
        axios.get(binanceUrl)
            .then(response => {
                const res = response.data;
                if (res.code) {
                    resolve({ status: 'error', message: res.msg });
                } else {
                    resolve({ status: 'success', data: res });
                }
            })
            .catch(error => {
                reject({ status: 'error', message: error.message });
            });
    }).catch(error => {
        return { status: 'error', message: error.message };
    });
}

module.exports = {
    getCryptoRates,
    getCryptoRate,
    loadMarketData
}