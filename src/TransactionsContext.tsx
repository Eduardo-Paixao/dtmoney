import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface ITransaction {
  createdAt: string;
  id: number;
  amount: number;
  title: string;
  type: string;
  category: string;
}

type ITransactionsInput = Omit<ITransaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionsInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction  = async (ITransactionsInput: ITransactionsInput) => {
    const response = await api.post("/transactions", {
      ...ITransactionsInput,
      createdAt: new Date(),
    })
    const {transactions:transaction } = response.data;

    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
