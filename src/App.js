import './App.css';
import { useState } from 'react';
import { INITIAL_TRANSACTIONS } from './mocks/data';
import Pagination from './components/Pagination';
import Searchbar from './components/Searchbar';
import Summary from './components/Summary';
import Transaction from './components/Transaction';
import TransactionForm from './components/TransactionForm';
import AddTransactionButton from './components/AddTransactionButton';

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState({ text: '', month: '', year: '' });

  const addTransaction = newTransaction => {
    // setTransactions([newTransaction, ...transactions]);

    const cloneTransactions = [...transactions];
    cloneTransactions.unshift(newTransaction);
    setTransactions(cloneTransactions);
  };

  const updateTransaction = (id, transaction) => {
    const idx = transactions.findIndex(item => item.id === id);
    if (idx !== -1) {
      const cloneTransactions = [...transactions];
      cloneTransactions[idx] = transaction;
      setTransactions(cloneTransactions);
    }
  };

  const deleteTransaction = id => {
    const idx = transactions.findIndex(item => item.id === id);
    if (idx !== -1) {
      const cloneTransactions = [...transactions];
      cloneTransactions.splice(idx, 1);
      setTransactions(cloneTransactions);
    }
  };

  const openAddForm = () => {
    setIsAdding(true);
  };

  const closeAddForm = () => {
    setIsAdding(false);
  };

  const filteredTransactions = transactions.filter(
    item =>
      // item.payee.toLowerCase().includes(filter.text.toLowerCase()) ||
      // item.category.name.toLowerCase().includes(filter.text.toLowerCase())
      // item.date.getMonth() === 5
      item.date.getFullYear() === 2021
  );

  return (
    <div className="container">
      <div className="content">
        {isAdding ? (
          <TransactionForm addTransaction={addTransaction} closeAddForm={closeAddForm} />
        ) : (
          <AddTransactionButton openAddForm={openAddForm} />
        )}
        <Summary transactions={transactions} />
        <Searchbar filter={filter} setFilter={setFilter} />
        <Pagination />
        <Transaction
          transactions={filteredTransactions}
          deleteTransaction={deleteTransaction}
          updateTransaction={updateTransaction}
        />
      </div>
    </div>
  );
}

export default App;
