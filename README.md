## Submission

- This code can be executed using the following command

```
npm run start
```

On running, it will return the latest portfolio value per token in USD.

Design approaches are typescript for type checkings, axios for API calls, csv-parser to parse transactions.csv file.

- The application will first parse the given CSV file, during that it collects the tokens and calculates its value bases on the Transaction type, if it is a Deposit respective amount will be added to the token, if it is a Withdrawal respective amount will be deducted from the token. In case if there is an error it will be displayed on the screen.
- Once the tokens data is available, to calls an end point provided by [cryptocompare](https://min-api.cryptocompare.com/documentation) to get the exchange rate in USD and converts the token value to USD.
- After conversion the data is printed on the console as portfolio.