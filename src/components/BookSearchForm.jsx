import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import searchForm from '../assets/styles/bookSearchInput.module.scss';
import BookResults from './BookResults';

export const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;
export const API_URL = `https://www.googleapis.com/books/v1/volumes?`;

export default function BookSearchForm() {
  const [buttonPlaceHolder] = useState(
    `Search for Books: 'Harry Potter...' etc`
  );
  const [bookInput, setBookInput] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(25);
  const [category, setCategory] = useState({ value: 'intitle:' });

  const fetchBooks = async () => {
    const response = await axios.get(
      `${API_URL}q=${category.value}"${bookInput}"&startIndex=${startIndex}&maxResults=${maxResults}&key=${KEY}`
    );
    if (bookInput.length <= 0) {
      throw new Error('input must contain at least one character');
    }
    return response;
  };
  const { data, isLoading, isFetching, error, refetch } = useQuery(
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

  const handleSelectCategory = (e) => {
    setCategory({ value: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={searchForm.bookForm}>
        <label htmlFor="select_category" className={searchForm.bookForm__label}>
          select category:
          <select
            id="selectCategory"
            value={category.value}
            onChange={handleSelectCategory}
            className={searchForm.bookForm__input_category}
          >
            <option value="intitle:">Title</option>
            <option value="inauthor:">Author</option>
            <option value="inpublisher:">publisher</option>
            <option value="subject:">subject</option>
          </select>
        </label>
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
          <span className={searchForm.bookForm__button_icon}>&#x1F50D;</span>
          Search
        </button>
      </form>
      <BookResults
        isFetching={isFetching}
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
