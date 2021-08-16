import './App.css';
import { useEffect, useState } from 'react';
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
  const [pagination, setPagination] = useState({ perPage: 5, currentPage: 1 });

  useEffect(() => {
    setPagination({ perPage: 5, currentPage: 1 });
  }, [filter]);

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
      (item.payee.toLowerCase().includes(filter.text.toLowerCase()) ||
        item.category.name.toLowerCase().includes(filter.text.toLowerCase())) &&
      (item.date.getMonth() === +filter.month || filter.month === '') &&
      (item.date.getFullYear() === +filter.year || filter.year === '')
  );

  const numPage = Math.ceil(filteredTransactions.length / pagination.perPage) || 1;

  // const shownTransactions = filteredTransactions.slice();
  // perPage =5 currentPage=1 ====> slice(0,5)
  // perPage =5 currentPage=2 ====> slice(5,10)
  // perPage =5 currentPage=3 ====> slice(10,15)

  // perPage = 10 currentPage = 1 ===> slice(0, 10)
  // perPage = 10 currentPage = 2 ===> slice(10, 20)
  const shownTransactions = filteredTransactions.slice(
    (pagination.currentPage - 1) * pagination.perPage,
    pagination.currentPage * pagination.perPage
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
        <Pagination pagination={pagination} setPagination={setPagination} numPage={numPage} />
        <Transaction
          transactions={shownTransactions}
          deleteTransaction={deleteTransaction}
          updateTransaction={updateTransaction}
        />
      </div>
    </div>
  );
}

export default App;
