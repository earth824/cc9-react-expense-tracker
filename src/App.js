import './App.css';
import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';
import Content from './components/layout/Content';
import CreateTransaction from './pages/CreateTransaction';
import Home from './pages/Home';
import MainContainer from './components/layout/MainContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransactionProvider } from './contexts/transactionContext';
import { SearchProvider } from './contexts/searchContext';
import { PaginationProvider } from './contexts/paginationContext';

function App() {
  return (
    <BrowserRouter>
      <PaginationProvider>
        <SearchProvider>
          <TransactionProvider>
            <MainContainer>
              <Header />
              <Content>
                <Switch>
                  <Route path="/create-transaction" component={CreateTransaction} />
                  {/* <Route path="/create-transaction" render={props => <CreateTransaction state={state} />} /> */}
                  <Route path="/" component={Home} />
                </Switch>
              </Content>
              <Footer />
            </MainContainer>
          </TransactionProvider>
        </SearchProvider>
      </PaginationProvider>
    </BrowserRouter>
  );
}

export default App;
