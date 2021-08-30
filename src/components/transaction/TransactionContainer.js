import { useContext } from 'react';
import { PaginationContext } from '../../contexts/paginationContext';
import TransactionCard from './TransactionCard';

function TransactionContainer({ transactions }) {
  const { perPage, currentPage } = useContext(PaginationContext);

  // currentPage:1 perPage:10 => show transaction 1 to 10 (index 0 to index 9)
  // currentPage:2 perPage:10 => show transaction 11 to 20 (index 10 to index 19)
  // currentPage:3 perPage:10 => show transaction 21 to 30 (index 20 to index 29)
  // ...
  // currentPage:n perPage:10 => show transaction 10 * (n-1) + 1 to 10 * n (index 10 * (n-1) to 10 * n -1)
  // currentPage:n perPage:m => show transaction m * (n-1) + 1 to m * n (index m * (n-1) to m * n -1)
  // [1, 3, 5, 7].slice(2)  [5 ,7]
  // [1, 3, 5, 7].slice(2, 3)  [5]

  // const startTime1 = new Date().getTime()
  const shownTransactions = transactions.slice(perPage * (currentPage - 1), perPage * currentPage);
  // const endTime1 = new Date().getTime()
  // const interval1 = endTime1 - startTime1;
  // const shownTransactions = transactions.filter(
  //   (item, index) => index <= currentPage * (perPage - 1) && index >= perPage * (currentPage - 1)
  // );

  return (
    <ul className="list-group">
      {shownTransactions.map(item => (
        <TransactionCard key={item.id} transaction={item} />
      ))}
    </ul>
  );
}

export default TransactionContainer;
