import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import Loading from './Loading';

// style/graphic
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import bookResults from '../assets/styles/bookResultsSection.module.scss';
import footerWaves from '../assets/images/footerWaves.webp';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import styled from '../assets/styles/bookCard.module.scss';

const BookResults = (props) => {
  const {
    data,
    title,
    isError,
    isLoading,
    isFetching,
    startIndex,
    maxResults,
    handleLoadMoreResults,
    handleLoadPrevResults,
  } = props;

  const scrollToTopResults = useRef(null);
  let bookCount = data?.data?.totalItems;
  // !for some reasons app is crashing when we clicked through to the last page, and if we click to go to the previous page, app crashes
  // !reducing the amount of books by maxResults returned fix this error
  bookCount -= maxResults;

  const scrollToTopBookResults = () => {
    scrollToTopResults.current.scrollIntoView();
  };

  const handleScrollAndLoadMoreBooks = () => {
    handleLoadMoreResults();
    scrollToTopBookResults();
  };

  const handleScrollAndLoadPreviousBooks = () => {
    handleLoadPrevResults();
    scrollToTopBookResults();
  };

  const isFirstPage =
    startIndex <= maxResults
      ? styled.books_wraper_buttons__prev__hidden
      : styled.books_wraper_buttons__prev;

  const isLastPage =
    startIndex >= bookCount
      ? styled.books_wraper_buttons__next__hidden
      : styled.books_wraper_buttons__next;

  console.log(data);
  const booksFetching = !isFetching ? styled.show_books : styled.hide_books;
  return (
    <>
      <main ref={scrollToTopResults} className={bookResults.results__container}>
        <ResultSVG />
        <div className={wrapper.container}>
          <header className={bookResults.recommendation}>
            <h2>{data && title}</h2>
            {!Number.isNaN(bookCount) && (
              <h3 className={bookResults.totalBooks}>
                total books: {startIndex >= bookCount ? bookCount : startIndex}/
                {bookCount}
              </h3>
            )}
          </header>
          {isLoading && <Loading />}
          <div />
          <div className={styled.books_wraper}>
            {data &&
              data?.data.items !== undefined &&
              data?.data?.items.map((book) => (
                <div className={booksFetching} key={book.id}>
                  <Link
                    key={book.id}
                    to={`/book/${book.id}`}
                    className={styled.book_link}
                  >
                    <BookCard book={book} />
                  </Link>
                </div>
              ))}

            {data && (
              <div className={styled.books_wraper_buttons}>
                <button
                  onClick={() => handleScrollAndLoadPreviousBooks()}
                  className={isFirstPage}
                  type="button"
                >
                  <span className={styled.books_wraper_buttons__arrows}>
                    &#171;
                  </span>
                  Previous
                </button>
                {startIndex <= bookCount && (
                  <button
                    onClick={() => handleScrollAndLoadMoreBooks()}
                    className={isLastPage}
                    type="button"
                  >
                    Next
                    <span className={styled.books_wraper_buttons__arrows}>
                      &#187;
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={bookResults.waves_Pattern}>
          <img src={footerWaves} alt="footer wave pattern" />
        </div>
      </main>
    </>
  );
};

BookResults.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  startIndex: PropTypes.number,
  maxResults: PropTypes.number,
  handleLoadMoreResults: PropTypes.func,
  handleLoadPrevResults: PropTypes.func,
};

export default BookResults;
