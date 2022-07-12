"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const csv_parse_1 = require("csv-parse");
const conversion_1 = require("./conversion");
const types_1 = require("./types");
const portfolio = {};
const storeTokens = (row) => {
    const transaction_type = row[1];
    const token = row[2];
    const amount = parseFloat(row[3]);
    if (transaction_type === types_1.TransactionActions.DEPOSIT) {
        if (portfolio[token]) {
            portfolio[token] = portfolio[token] + amount;
        }
        else {
            portfolio[token] = amount;
        }
    }
    else if (transaction_type === types_1.TransactionActions.WITHDRAWAL) {
        if (portfolio[token]) {
            portfolio[token] = portfolio[token] - amount;
        }
    }
};
const driver = () => {
    fs.createReadStream("./data/transactions.csv")
        .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
        storeTokens(row);
    })
        .on("end", () => (0, conversion_1.convertPortfolio)(portfolio))
        .on("error", (error) => {
        console.log(error.message);
    });
};
driver();
