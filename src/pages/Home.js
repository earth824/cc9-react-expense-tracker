import SummaryContainer from '../components/summary/SummaryContainer';
import FilterContainer from '../components/filter/FilterContainer';
import PaginationContainer from '../components/pagination/PaginationContainer';
import TransactionContainer from '../components/transaction/TransactionContainer';
import { useContext } from 'react';
import { TransactionContext } from '../contexts/transactionContext';
import { SearchContext } from '../contexts/searchContext';

function Home() {
  const { transactions } = useContext(TransactionContext); // { transactions: [...], setTransactions: fn() }
  const { searchText, searchMonth, searchYear } = useContext(SearchContext);

  const filterdTransactions = transactions.filter(
    item =>
      (item.payee.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.type.toLowerCase().includes(searchText.toLowerCase())) &&
      (item.date.getMonth() === searchMonth || searchMonth === '') &&
      // (item.date.slice(5, 7) ===
      //   (`${searchMonth + 1}`.length === 1 ? 0 + `${searchMonth + 1}` : `${searchMonth + 1}`) ||
      //   searchMonth === '')
      (item.date.getFullYear() === searchYear || searchYear === '')
  );

  return (
    <>
      <SummaryContainer transactions={filterdTransactions} />
      <FilterContainer />
      <PaginationContainer length={filterdTransactions.length} />
      <TransactionContainer transactions={filterdTransactions} />
    </>
  );
}

export default Home;
