import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import searchForm from '../assets/styles/bookSearchInput.module.scss';
import BookResults from './BookResults';
import Loading from './Loading';

const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;
const API_URL = `https://www.googleapis.com/books/v1/volumes?`;

export default function BookSearchForm() {
  const [buttonPlaceHolder] = useState(
    `Search for Books: 'Harry Potter...' etc`
  );
  const [bookInput, setBookInput] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(25);

  const fetchBooks = async () => {
    const response = await axios(
      `${API_URL}q=${bookInput}&startIndex=${startIndex}&maxResults=${maxResults}&key=${KEY}`
    );
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
  };

  const handleLoadMoreResults = () => {
    setStartIndex(() => startIndex + maxResults);
    refetch();
  };

  const handleLoadPrevResults = () => {
    setStartIndex(() => startIndex - maxResults);
    refetch();
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
          placeholder={
            error
              ? 'Error: input must contain at lost one character'
              : buttonPlaceHolder
          }
        />
        <button className={searchForm.bookForm__button} type="submit">
          Search
        </button>
      </form>
      <BookResults
        startIndex={startIndex}
        maxResults={maxResults}
        handleLoadMoreResults={handleLoadMoreResults}
        handleLoadPrevResults={handleLoadPrevResults}
        isLoading={isLoading}
        data={data}
        title={bookInput}
        error={error}
      />
    </>
  );
}
