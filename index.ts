import * as fs from "fs";
import { parse } from "csv-parse";
import { convertPortfolio } from "./conversion";
import { TransactionActions, Portfolio } from "./types";

const portfolio: Portfolio<any> = {};

const storeTokens = (row: Array<any>) => {
  const transaction_type = row[1];
  const token = row[2];
  const amount = parseFloat(row[3]);
  if (transaction_type === TransactionActions.DEPOSIT) {
    if (portfolio[token]) {
      portfolio[token] = portfolio[token] + amount;
    } else {
      portfolio[token] = amount;
    }
  } else if (transaction_type === TransactionActions.WITHDRAWAL) {
    if (portfolio[token]) {
      portfolio[token] = portfolio[token] - amount;
    }
  }
};

const driver = () => {
  fs.createReadStream("./data/transactions.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row: Array<any>) => {
      storeTokens(row);
    })
    .on("end", () => convertPortfolio(portfolio))
    .on("error", (error: any) => {
      console.log(error.message);
    });
};

driver();
