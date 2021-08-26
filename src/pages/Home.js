import SummaryContainer from '../components/summary/SummaryContainer';
import FilterContainer from '../components/filter/FilterContainer';
import PaginationContainer from '../components/pagination/PaginationContainer';
import TransactionContainer from '../components/transaction/TransactionContainer';

function Home() {
  return (
    <>
      <SummaryContainer />
      <FilterContainer />
      <PaginationContainer />
      <TransactionContainer />
    </>
  );
}

export default Home;
