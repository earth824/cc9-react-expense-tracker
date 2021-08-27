import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get('http://localhost:8080/transactions');
        setTransactions(res.data.transactions.map(item => ({ ...item, date: new Date(item.date) })));
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransaction();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions: transactions, setTransactions: setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionProvider };
