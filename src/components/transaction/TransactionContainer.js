import { useContext } from 'react';
import { TransactionContext } from '../../contexts/transactionContext';
import TransactionCard from './TransactionCard';

function TransactionContainer() {
  const { transactions } = useContext(TransactionContext); // { transactions: [...], setTransactions: fn() }
  return (
    <ul className="list-group">
      {transactions.map(item => (
        <TransactionCard key={item.id} transaction={item} />
      ))}
    </ul>
  );
}

export default TransactionContainer;
