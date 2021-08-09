import './App.css';
import { useState } from 'react';
import { INITIAL_TRANSACTIONS } from './mocks/data';
import Pagination from './components/Pagination';
import Searchbar from './components/Searchbar';
import Summary from './components/Summary';
import Transaction from './components/Transaction';
import TransactionForm from './components/TransactionForm';

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  return (
    <div className="container">
      <div className="content">
        <TransactionForm />
        <Summary />
        <Searchbar />
        <Pagination />
        <Transaction transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
