import './App.css';
import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';
import Content from './components/layout/Content';
import CreateTransaction from './pages/CreateTransaction';
import EditTransaction from './pages/EditTransaction';
import Home from './pages/Home';
import MainContainer from './components/layout/MainContainer';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
                  <Route path="/edit-transaction/:id" component={EditTransaction} />
                  {/* <Route path="/create-transaction" render={props => <CreateTransaction state={state} />} /> */}
                  <Route exact path="/" component={Home} />
                  <Route path="/not-found" render={() => <h1 style={{ color: '#fff' }}>This page is not found</h1>} />
                  <Redirect to="/not-found" />
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
