const axios = require("axios");
import { Portfolio } from "./types";
const getBalance = (portfolio: Portfolio<any>) => {
  console.log("Portfolio: ", portfolio);
};

export const convertPortfolio = (portfolio: Portfolio<any>) => {
  const keys = Object.keys(portfolio);
  Promise.all(
    keys.map((token: string) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD`
          )
          .then((response: any) => {
            resolve(
              (portfolio[token] = portfolio[token] * response.data.USD + " USD")
            );
          })
          .catch((error: any) => reject(error));
      });
    })
  )
    .then(() => {
      getBalance(portfolio);
    })
    .catch((error) => console.log(error));
};
