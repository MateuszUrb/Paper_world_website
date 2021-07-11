import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { KEY } from './BookSearchForm';
import Footer from './Footer';
import Loading from './Loading';
import BookCard from './BookCard';

// styles
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import bookResults from '../assets/styles/bookResultsSection.module.scss';
import { ReactComponent as Logo } from '../assets/images/Logo.svg';
import footerWaves from '../assets/images/footerWaves.webp';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import detailsStyle from '../assets/styles/bookDetails.module.scss';

const Book = ({ match }) => {
  const [subjectBooks, setSubjectBooks] = useState();
  const [fetchedSubject, setFetchedSubject] = useState();

  const fetchBookDetail = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${match.params.id}`
    );
    if (response.data === null) {
      throw new Error(`sorry error`);
    }
    return response;
  };

  const { data, isLoading } = useQuery(['books'], fetchBookDetail);

  // ok sorry for this mess ok? don't be mad to whoever will look at this  please
  // ?i got problem with destructing google api object, so I choose this instead
  // not the best idea, but hey... it works :grin:
  const description = data?.data?.volumeInfo.description;
  const authors = data?.data?.volumeInfo.authors;
  // google books api has a lot of holes with missing elements
  // !so in this example thumbnail image was crashing whole app
  // ?and this prevent it from doing it, probably not the best option, but workss
  const bookCover = data?.data?.volumeInfo.imageLinks
    ? data?.data?.volumeInfo.imageLinks.thumbnail
    : 'not found';

  // data from google books api
  const pageCount = data?.data?.volumeInfo.pageCount;
  const publishedDate = data?.data?.volumeInfo.publishedDate;
  // const publisher = data?.data?.volumeInfo.publisher;
  const title = data?.data?.volumeInfo.title;
  const categories = data?.data?.volumeInfo.categories;
  const moreInfo = data?.data?.volumeInfo.infoLink;

  const handleMoreInfoButton = () => {
    const win = window.open(moreInfo, '_blank');
    win.focus();
  };

  const handleSubjectName = () => {
    if (categories) {
      const subjectName = categories[0].split(' ')[0];
      setFetchedSubject(subjectName);
    } else {
      setFetchedSubject('recommended');
    }
  };
  useEffect(() => {
    handleSubjectName();
  }, []);

  const fetchSimilarBooks = async () => {
    const subjectData = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${fetchedSubject}&maxResults=9&key=${KEY}`
    );
    if (subjectData.data === null) {
      throw new Error(`sorry error`);
    } else {
      setSubjectBooks(subjectData);
    }
  };
  useEffect(() => {
    fetchSimilarBooks();
  }, []);

  return (
    <>
      <main className={detailsStyle.details_container}>
        <nav className={`${wrapper.container} ${detailsStyle.nav}`}>
          <Link to="/" className={detailsStyle.nav__logo}>
            <Logo className={detailsStyle.nav__logo} />
          </Link>
        </nav>
        <ResultSVG />
        <div className={wrapper.container}>
          {isLoading && <Loading />}
          <div className={detailsStyle.bookDetails__wrapper}>
            {data && (
              <>
                <div className={detailsStyle.bookDetails__wrapper_img}>
                  <img
                    className={detailsStyle.bookDetails__img}
                    src={
                      bookCover === undefined ? 'img not available' : bookCover
                    }
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
                  <div
                    className={detailsStyle.bookDetails__wrapper_publishedDate}
                  >
                    <p className={detailsStyle.bookDetails__publishedDate}>
                      Data premiery: {publishedDate}
                    </p>
                  </div>
                  <div className={detailsStyle.bookDetails__wrapper_pageCount}>
                    <p className={detailsStyle.bookDetails__pageCount}>
                      liczba stron: {pageCount}
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
              </>
            )}
          </div>
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
          {data ? (
            <div className={detailsStyle.similarBooks}>
              <h1 className={detailsStyle.similarBooks__title}>
                Similar books :
              </h1>
              <div className={detailsStyle.similarBooks__results}>
                {subjectBooks?.data?.items.map((book) => (
                  <Link
                    className={detailsStyle.similarBooks__results_book}
                    to={`/book/${book.id}`}
                  >
                    <BookCard book={book} />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>

        <div className={bookResults.waves_Pattern}>
          <img src={footerWaves} alt="footer wave pattern" />
        </div>
      </main>
      <Footer />
    </>
  );
};

Book.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Book;
