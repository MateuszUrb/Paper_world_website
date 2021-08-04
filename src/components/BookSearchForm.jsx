import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import BookResults from './BookResults';

// style
import searchForm from '../assets/styles/bookSearchInput.module.scss';

// export const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;
export const API_URL = `https://www.googleapis.com/books/v1/volumes?`;

toast.configure();

export default function BookSearchForm() {
  const [buttonPlaceHolder] = useState(
    `Search for Books: 'Harry Potter...' etc`
  );
  const [bookInput, setBookInput] = useState('');
  const [startIndex, setStartIndex] = useState(25);
  const [maxResults, setMaxResults] = useState(25);
  const [category, setCategory] = useState({ value: 'intitle:' });

  const fetchBooks = async () => {
    if (bookInput.length <= 0) {
      toast('🚨 input must contain at least one character 🚨', {
        type: 'warning',
        autoClose: 8000,
      });
      throw new Error('input must contain at least one character');
    }

    const response = await axios.get(
      `${API_URL}q="${bookInput}+${category.value}"&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    if (response.data.totalItems <= 0) {
      toast(`⛔ nothing was found with given word: ${bookInput}`, {
        type: 'error',
        autoClose: 8000,
      });
      throw new Error(`nothing was found with given word: ${bookInput}`);
    }
    return response;
  };

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery(
    [bookInput],
    fetchBooks,
    {
      enabled: false,
      retry: false,
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
    setStartIndex((prevState) => prevState + maxResults);
    refetch();
  };

  const handleLoadPrevResults = () => {
    setStartIndex((prevState) => prevState - maxResults);
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
          className={
            error
              ? searchForm.bookForm__input_error
              : searchForm.bookForm__input
          }
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
        isError={isError}
        key={1}
      />
    </>
  );
}
