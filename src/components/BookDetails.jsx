import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import footerWaves from '../assets/images/footerWaves.webp';
import { ReactComponent as Logo } from '../assets/images/Logo.svg';
// styles
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import detailsStyle from '../assets/styles/bookDetails.module.scss';
import bookResults from '../assets/styles/bookResultsSection.module.scss';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import style from '../assets/styles/invalidBookId.module.scss';
import BookCard from './BookCard';
import { KEY } from './BookSearchForm';
import Footer from './Footer';
import Loading from './Loading';

const Book = ({ match }) => {
  const [subjectBooks, setSubjectBooks] = useState([]);
  const [fetchedSubject, setFetchedSubject] = useState();
  const [similarCategory, setSimilarCategory] = useState('');
  const scrollToTopResults = useRef(null);

  const fetchBookDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${match.params.id}`
      );
      return response;
    } catch (err) {
      toast(
        `📗we could not found the book:
        ${err.message}`,
        { type: 'error' }
      );
      throw new Error('cannot find book with given Id');
    }
  };

  const { data, isLoading, error } = useQuery(['books'], fetchBookDetail, {
    retry: false,
  });

  // google books api has a lot of holes with missing elements
  // so in this example thumbnail image was crashing whole app
  // and this prevent it from doing it, probably not the best option, but works
  const bookCover = data?.data?.volumeInfo.imageLinks
    ? data?.data?.volumeInfo.imageLinks.thumbnail
    : 'not found';

  // data from google books api
  const description = data?.data?.volumeInfo.description;
  const authors = data?.data?.volumeInfo.authors;
  const pageCount = data?.data?.volumeInfo.pageCount;
  const publishedDate = data?.data?.volumeInfo.publishedDate;
  const title = data?.data?.volumeInfo.title;
  const categories = data?.data?.volumeInfo.categories;
  const moreInfo = data?.data?.volumeInfo.infoLink;

  useEffect(() => {
    if (title) {
      setFetchedSubject(() => title.replaceAll(' ', '+'));
      setSimilarCategory(() => 'intitle:');
    }
    if (Array.isArray(authors)) {
      setFetchedSubject(() => authors[0].replaceAll(' ', '+'));
      setSimilarCategory(() => 'inauthor:');
    }
    if (categories) {
      setFetchedSubject(() => categories && categories[0].replaceAll(' ', '+'));
      setSimilarCategory(() => 'subject:');
    }
  }, [title, authors, categories]);

  const handleMoreInfoButton = () => {
    const win = window.open(moreInfo, '_blank');
    win.focus();
  };

  const scrollToTopBookResults = () => {
    scrollToTopResults.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToTopBookResults();
  }, []);

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        const subjectData = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${fetchedSubject}+${similarCategory}&maxResults=12&key=${KEY}`
        );
        console.log(subjectData);
        setSubjectBooks(subjectData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSimilarBooks();
  }, [fetchedSubject, similarCategory]);

  return (
    <>
      <main ref={scrollToTopResults} className={detailsStyle.details_container}>
        <nav className={`${wrapper.container} ${detailsStyle.nav}`}>
          <Link to="/" className={detailsStyle.nav__logo}>
            <Logo className={detailsStyle.nav__logo} />
          </Link>
        </nav>
        <ResultSVG />
        <div className={wrapper.container}>
          {isLoading && <Loading />}
          {error && <ErrorWhileInvalidBookID />}
          <BookDetails
            data={data}
            title={title}
            bookCover={bookCover}
            publishedDate={publishedDate}
            pageCount={pageCount}
            categories={categories}
            description={description}
            authors={authors}
          />
          {data && moreInfo && (
            <button
              className={detailsStyle.read__book}
              type="button"
              onClick={handleMoreInfoButton}
            >
              More info
            </button>
          )}
          {data && <div className={detailsStyle.book_separator} />}
          <DisplaySimilarBooks data={data} subjectBooks={subjectBooks} />
        </div>
        <div className={bookResults.waves_Pattern}>
          <img src={footerWaves} alt="footer wave pattern" />
        </div>
      </main>
      <Footer />
    </>
  );
};

//
const BookDetails = (props) => {
  const {
    data,
    title,
    bookCover,
    authors,
    publishedDate,
    pageCount,
    categories,
    description,
  } = props;
  return (
    <>
      {data && (
        <>
          <div className={detailsStyle.bookDetails__wrapper}>
            <div className={detailsStyle.bookDetails__wrapper_img}>
              <img
                className={detailsStyle.bookDetails__img}
                src={bookCover === undefined ? 'img not available' : bookCover}
                alt={
                  title && bookCover === undefined
                    ? `image not found ${title}`
                    : `image not found ${title}`
                }
              />
            </div>
            <div className={detailsStyle.bookDetails__wrapper_title}>
              <h1 className={detailsStyle.bookDetails__title}>
                Title: {title}
              </h1>
            </div>
            <div className={detailsStyle.bookDetails__wrapper_author}>
              <h2 className={detailsStyle.bookDetails__author}>
                Author: {authors}
              </h2>
            </div>
            <div className={detailsStyle.bookDetails__wrapper_bookInfo}>
              <div className={detailsStyle.bookDetails__wrapper_publishedDate}>
                <p className={detailsStyle.bookDetails__publishedDate}>
                  Premiere date: {publishedDate}
                </p>
              </div>
              <div className={detailsStyle.bookDetails__wrapper_pageCount}>
                <p className={detailsStyle.bookDetails__pageCount}>
                  Page count: {pageCount}
                </p>
              </div>
              <div className={detailsStyle.bookDetails__wrapper_category}>
                <p className={detailsStyle.bookDetails__categories}>
                  categories:
                  {categories ? <p>{categories[1]}</p> : 'not found'}
                </p>
              </div>
            </div>

            <div className={detailsStyle.bookDetails__wrapper_description}>
              <p className={detailsStyle.bookDetails__description}>
                {description === undefined
                  ? 'description: not found'
                  : // remove every html tags from description txt
                    description.replace(/<[^>]+>/g, '')}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

BookDetails.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  categories: PropTypes.array,
  pageCount: PropTypes.number,
  bookCover: PropTypes.any,
  authors: PropTypes.array,
  publishedDate: PropTypes.string,
};

const DisplaySimilarBooks = (props) => {
  const { subjectBooks, data } = props;
  return (
    <>
      {data && (
        <div className={detailsStyle.similarBooks}>
          <h1 className={detailsStyle.similarBooks__title}>See also :</h1>
          <div className={detailsStyle.similarBooks__results}>
            {subjectBooks &&
              subjectBooks?.data?.items.map((book) => (
                <Link
                  key={book.id}
                  className={detailsStyle.similarBooks__results_book}
                  to={`/book/${book.id}`}
                >
                  <BookCard book={book} />
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

DisplaySimilarBooks.propTypes = {
  subjectBooks: PropTypes.object,
  data: PropTypes.object,
};

const ErrorWhileInvalidBookID = () => {
  const history = useHistory();
  const homeButton = useRef();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={style.invalidBookId__wrapper}>
      <h1 className={style.invalidBookId__wrapper_header}>
        Sorry The book with the given id you are looking for doesn't exist
      </h1>
      <button
        ref={homeButton}
        className={style.invalidBookId__wrapper_goBack}
        type="button"
        onClick={goBack}
      >
        GO BACK
      </button>
    </div>
  );
};

Book.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Book;
