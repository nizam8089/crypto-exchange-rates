'use strict';

const assert = require('assert');
const axios = require('axios');
const { getCryptoRates, getCryptoRate, loadMarketData } = require('../lib/index');

// Mocking the axios get method for testing purposes
axios.get = async (url, config) => {
    if (url === 'https://api.binance.com/api/v3/ticker/price') {
        const { params } = config;
        if (params && params.symbols) {
            const symbols = JSON.parse(params.symbols);
            if (symbols.includes('BTCUSDT')) {
                return {
                    data: { symbol: 'BTCUSDT', price: '32000' }
                };
            } else if (symbols.includes('ETHUSDT')) {
                return {
                    data: { symbol: 'ETHUSDT', price: '2000' }
                };
            } else if (symbols.includes('BNBUSDT')) {
                return {
                    data: { symbol: 'BNBUSDT', price: '300' }
                };
            }
        }
        return {
            data: { status: 'success', message: 'Data not found' }
        };
    }
};

describe('Crypto Rates API', () => {
    describe('getCryptoRates', () => {
        it('should return an object with rates for specified symbols', async () => {
            const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
            const result = await getCryptoRates(symbols);
            assert.deepStrictEqual(result, {
                status: 'success',
                data: [
                    { symbol: 'BTCUSDT', price: '32000' },
                    { symbol: 'ETHUSDT', price: '2000' },
                    { symbol: 'BNBUSDT', price: '300' }
                ]
            });
        });

        it('should return an error message if data is not found', async () => {
            const symbols = ['UNKNOWN'];
            const result = await getCryptoRates(symbols);
            assert.deepStrictEqual(result, {
                status: 'error',
                message: 'Data not found'
            });
        });

        it('should return an empty array if no symbols are provided', async () => {
            const result = await getCryptoRates();
            assert.deepStrictEqual(result, {
                status: 'success',
                data: []
            });
        });
    });

    describe('getCryptoRate', () => {
        it('should return the rate for a specified symbol', async () => {
            const symbol = 'BTCUSDT';
            const result = await getCryptoRate(symbol);
            assert.deepStrictEqual(result, {
                status: 'success',
                data: { symbol: 'BTCUSDT', price: '32000' }
            });
        });

        it('should return an error message if the symbol is not found', async () => {
            const symbol = 'UNKNOWN';
            const result = await getCryptoRate(symbol);
            assert.deepStrictEqual(result, {
                status: 'error',
                message: 'Data not found'
            });
        });
    });

    describe('loadMarketData', () => {
        it('should return an array of market data', async () => {
            const result = await loadMarketData();
            assert.deepStrictEqual(result, {
                status: 'success',
                data: [
                    { symbol: 'BTCUSDT', price: '32000' },
                    { symbol: 'ETHUSDT', price: '2000' },
                    { symbol: 'BNBUSDT', price: '300' }
                ]
            });
        });

        it('should return an error message if the market data is not found', async () => {
            axios.get = async () => {
                throw new Error('Failed to load market data');
            };

            const result = await loadMarketData();
            assert.deepStrictEqual(result, {
                status: 'error',
                message: 'Failed to load market data'
            });
        });
    });
});
