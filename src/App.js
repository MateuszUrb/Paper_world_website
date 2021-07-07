import './App.scss';
import mailgo, { MailgoConfig } from 'mailgo';
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import BookSearchForm from './components/BookSearchForm';
import Loading from './components/Loading.jsx';

import style from './assets/styles/loadingPage.module.scss';
import { ReactComponent as ResultSVG } from './assets/images/result_svg.svg';

const Footer = React.lazy(() => import('./components/Footer'));
const Book = React.lazy(() => import('./components/BookDetails'));
const NotFound = React.lazy(() => import('./components/404.jsx'));

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
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/book/:id" component={Book} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

const LoadingPage = () => (
  <div className={style.loading__wrapper}>
    <ResultSVG />
    <div className={style.loading__wrapper_card}>
      <Loading />
    </div>
  </div>
);

export default App;
