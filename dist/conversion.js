"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPortfolio = void 0;
const axios = require("axios");
const getBalance = (portfolio) => {
    console.log("Portfolio: ", portfolio);
};
const convertPortfolio = (portfolio) => {
    const keys = Object.keys(portfolio);
    Promise.all(keys.map((token) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD`)
                .then((response) => {
                resolve((portfolio[token] = portfolio[token] * response.data.USD + " USD"));
            })
                .catch((error) => reject(error));
        });
    }))
        .then(() => {
        getBalance(portfolio);
    })
        .catch((error) => console.log(error));
};
exports.convertPortfolio = convertPortfolio;
