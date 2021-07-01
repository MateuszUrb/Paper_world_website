import { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Footer from './Footer';
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import bookResults from '../assets/styles/bookResultsSection.module.scss';
import footerWaves from '../assets/images/footerWaves.webp';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import { ReactComponent as Logo } from '../assets/images/Logo.svg';
import detailsStyle from '../assets/styles/bookDetails.module.scss';

const Book = ({ match }) => {
  const [data, setData] = useState([]);
  const fetchBookDetail = () => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${match.params.id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchBookDetail();
  }, []);
  return (
    <>
      <main className={detailsStyle.details_container}>
        <Router>
          <nav className={`${wrapper.container} ${detailsStyle.nav}`}>
            <Link to="/">
              <Logo className={detailsStyle.nav__logo} />1
            </Link>
          </nav>
        </Router>
        <ResultSVG />
        <div className={wrapper.container}>
          <header className={bookResults.recommendation} />
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
  params: PropTypes.object,
  match: PropTypes.object,
};
export default Book;
