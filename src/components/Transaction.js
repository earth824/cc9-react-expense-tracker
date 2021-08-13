import TransactionCard from './TransactionCard';

function Transaction(props) {
  return (
    <ul className="list-group">
      {props.transactions.map(item => (
        <TransactionCard
          key={item.id}
          transaction={item}
          deleteTransaction={props.deleteTransaction}
          updateTransaction={props.updateTransaction}
        />
      ))}
    </ul>
  );
}

export default Transaction;
