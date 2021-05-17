import './App.scss';
import Header from './components/Header';
import BookSearchForm from './components/BookSearchForm';
import BookResults from './components/BookResults';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <BookSearchForm />
      <BookResults />
      <Footer />
    </>
  );
}

export default App;
