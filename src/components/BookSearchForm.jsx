import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import searchForm from '../assets/styles/bookSearchInput.module.scss';
import BookResults from './BookResults';

const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;
const API_URL = `https://www.googleapis.com/books/v1/volumess?`;

export default function BookSearchForm() {
  const [buttonPlaceHolder] = useState(
    `Search for Books: 'Harry Potter...' etc`
  );
  const [bookInput, setBookInput] = useState('');

  const fetchBooks = async () => {
    const response = await axios(`${API_URL}q=${bookInput}&key=${KEY}`);
    return response;
  };
  const { data, isLoading, error, refetch } = useQuery(
    ['books', bookInput],
    fetchBooks,
    {
      enabled: false,
    }
  );

  const handleInputChange = (e) => {
    setBookInput(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={searchForm.bookForm}>
        <input
          className={searchForm.bookForm__input}
          type="text"
          name="text"
          id="text"
          value={bookInput}
          onChange={handleInputChange}
          placeholder={error ? 'Error' : buttonPlaceHolder}
        />
        {error && (
          <h4 className={searchForm.bookForm__input__error}>{error.message}</h4>
        )}
        <button className={searchForm.bookForm__button} type="submit">
          Search
        </button>
      </form>
      <BookResults
        isLoading={isLoading}
        data={data}
        title={bookInput}
        error={error}
      />
    </>
  );
}
