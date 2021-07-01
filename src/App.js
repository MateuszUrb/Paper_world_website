import './App.scss';
import mailgo, { MailgoConfig } from 'mailgo';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import BookSearchForm from './components/BookSearchForm';
import Footer from './components/Footer';
import Book from './components/BookDetails';
import NotFound from './components/404.jsx';

const mailgoConfig: MailgoConfig = {
  dark: true,
};

const MainPage = () => (
  <>
    <Header />
    <BookSearchForm />
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    mailgo(mailgoConfig);
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/book/:id" component={Book} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
