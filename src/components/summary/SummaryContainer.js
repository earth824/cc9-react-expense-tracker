import { useContext } from 'react';
import SummaryCard from './SummaryCard';
import { TransactionContext } from '../../contexts/transactionContext';

function SummaryContainer() {
  const { transactions } = useContext(TransactionContext);

  const expense = transactions.reduce((sum, item) => {
    if (item.category.type === 'EXPENSE') {
      return sum + item.amount;
    }
    return sum;
  }, 0);

  // const expense = transactions.reduce(
  //   (sum, { amount, category: { type } }) => (type === 'EXPENSE' ? sum + amount : sum),
  //   0
  // );

  const income = transactions.reduce((sum, item) => {
    if (item.category.type === 'INCOME') {
      return sum + item.amount;
    }
    return sum;
  }, 0);

  return (
    <div className="row g-3">
      <SummaryCard bg="info" title="Net Worth" value={income - expense} />
      <SummaryCard bg="success" title="Income" value={income} />
      <SummaryCard bg="danger" title="Expense" value={expense} />
    </div>
  );
}

export default SummaryContainer;
