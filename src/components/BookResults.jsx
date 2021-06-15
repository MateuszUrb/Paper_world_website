import { useRef } from 'react';
import PropTypes from 'prop-types';
import bookResults from '../assets/styles/bookResultsSection.module.scss';
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import footerWaves from '../assets/images/footerWaves.webp';
import BookCard from './BookCard';
import Loading from './Loading';
import styled from '../assets/styles/bookCard.module.scss';

const BookResults = (props) => {
  const {
    data,
    title,
    error,
    isLoading,
    startIndex,
    maxResults,
    handleLoadMoreResults,
    handleLoadPrevResults,
  } = props;
  const scrollToTopResults = useRef(null);
  const bookCount = data?.data?.totalItems;

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
  return (
    <>
      <main ref={scrollToTopResults} className={bookResults.results__container}>
        <ResultSVG />
        <div className={wrapper.container}>
          <header className={bookResults.recommendation}>
            <h2>{data && title}</h2>
            {bookCount && (
              <h3 className={bookResults.totalBooks}>
                total books: {startIndex >= bookCount ? bookCount : startIndex}/
                {bookCount}
              </h3>
            )}
          </header>
          {isLoading && <Loading />}
          <div />
          {error && (
            <h2 className={styled.info__error}>
              An error has occurred: {error.message}
            </h2>
          )}
          <div className={styled.books_wraper}>
            {data?.data?.items.map((book) => (
              <BookCard book={book} />
            ))}
            {data && (
              <div className={styled.books_wraper_buttons}>
                <button
                  onClick={() => handleScrollAndLoadPreviousBooks()}
                  className={isFirstPage}
                  type="button"
                >
                  Previous
                </button>
                {startIndex <= bookCount && (
                  <button
                    onClick={() => handleScrollAndLoadMoreBooks()}
                    className={isLastPage}
                    type="button"
                  >
                    Next
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
  error: PropTypes.bool,
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  startIndex: PropTypes.number,
  maxResults: PropTypes.number,
  handleLoadMoreResults: PropTypes.func,
  handleLoadPrevResults: PropTypes.func,
};

export default BookResults;
