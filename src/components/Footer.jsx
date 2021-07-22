import { Link, BrowserRouter as Router } from 'react-router-dom';
import styleFooter from '../assets/styles/footer.module.scss';
import containerWrapper from '../assets/styles/contentWrapper.module.scss';
import FbIcon from '../assets/images/icon_fb.svg';
import TwitterIcon from '../assets/images/icon_twitter.svg';
import MailIcon from '../assets/images/icon_mail.svg';

const Footer = () => (
  <>
    <Router>
      <footer className={styleFooter.footer}>
        <div
          className={`${containerWrapper.container} ${styleFooter.footer__content}`}
        >
          <ul className={styleFooter.footer__linkList}>
            <li className={styleFooter.footer__linkList_link}>
              <Link
                to={{
                  pathname: 'https://www.facebook.com/mateusz.urban.353',
                }}
                target="_blank"
              >
                <img src={FbIcon} alt="facebook icon" />
              </Link>
            </li>
            <li className={styleFooter.footer__linkList_link}>
              <Link
                to={{
                  pathname: 'https://twitter.com/M_Urban98',
                }}
                target="_blank"
              >
                <img src={TwitterIcon} alt="twitter icon" />
              </Link>
            </li>
            <li className={styleFooter.footer__linkList_link}>
              <a
                className="App-link"
                href="mailto:98m.urban@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={MailIcon} alt="mail icon" />
              </a>
            </li>
          </ul>
          <p className={styleFooter.footer__creator}>
            created and designed by
            <Link
              to={{
                pathname: 'https://github.com/MateuszUrb',
              }}
              target="_blank"
            >
              Me
            </Link>{' '}
            <span>&hearts;</span>
          </p>
          <p className={styleFooter.footer__copyright}>
            <i className="fas fa-copyright" />
            Copyright 2021, Mateusz Urban
          </p>
        </div>
      </footer>
    </Router>
  </>
);

export default Footer;
