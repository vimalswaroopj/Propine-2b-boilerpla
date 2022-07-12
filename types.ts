export const TransactionActions = {
  DEPOSIT: "DEPOSIT",
  WITHDRAWAL: "WITHDRAWAL",
};
export type Portfolio<T> = T & { [key: string]: string };
