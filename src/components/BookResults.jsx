import PropTypes from 'prop-types';
import bookResults from '../assets/styles/bookResultsSection.module.scss';
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import footerWaves from '../assets/images/footerWaves.webp';
import BookCard from './BookCard';
import Loading from './Loading';
import styled from '../assets/styles/bookCard.module.scss';

const BookResults = (props) => {
  const { data, title, error, isLoading } = props;
  const bookCount = data?.data?.totalItems;
  return (
    <>
      <main className={bookResults.results__container}>
        <ResultSVG />
        <div className={wrapper.container}>
          <header className={bookResults.recommendation}>
            <h2>{data && title}</h2>
            {bookCount && (
              <h3 className={bookResults.totalBooks}>
                total books: {bookCount}
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
};

export default BookResults;
