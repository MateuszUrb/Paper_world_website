import './App.scss';
// import { useQuery } from 'react-query';
// import axios from 'axios';
import Header from './components/Header';
import BookSearchForm from './components/BookSearchForm';
import BookResults from './components/BookResults';
import Footer from './components/Footer';

// const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;

// axios.defaults.baseURL = `https://www.googleapis.com/books/v1/volumes?q=XQC&&key=${KEY}`;

// const fetchBooks = async () => {
//   const response = await axios();
//   return response;
// };

function App() {
  // const { data, isLoading, error } = useQuery('books', fetchBooks);
  return (
    <>
      <Header />
      <BookSearchForm />
      <Footer />
      {/* <BookResults
        booksData={data}
        isLoading={isLoading}
        error={error}
        title="Recommendation"
      /> */}
    </>
  );
}

export default App;
