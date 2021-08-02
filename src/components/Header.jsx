import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
// style/graphic
import headerStyles from '../assets/styles/header.module.scss';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import Book from '../assets/images/book.webp';
import { ReactComponent as Logo } from '../assets/images/Logo.svg';
import { ReactComponent as GithubIcon } from '../assets/images/github-square.svg';
import { ReactComponent as BgPatternDesktop } from '../assets/images/Desktop_bg_pattern.svg';
import { ReactComponent as BookBackground } from '../assets/images/book_wave.svg';

function Header() {
  return (
    <>
      <div className={headerStyles.bookBg_wrapper}>
        <BookBackground className={headerStyles.bookBg} />
      </div>
      <HeaderBGPattern />
      <header className={headerStyles.header}>
        <Nav />
        <BookSVG />
      </header>
    </>
  );
}

const HeaderBGPattern = () => (
  <div className={headerStyles.header__bg_pattern}>
    <BgPatternDesktop />
  </div>
);

const Nav = () => {
  const nav = useRef(null);

  useEffect(() => {
    const navigation = nav.current;

    navigation.animate(
      [
        { transform: 'translateY(-100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      {
        duration: 700,
        delay: 500,
        fill: 'forwards',
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    );
  });
  return (
    <Router>
      <nav className={`${wrapper.container} ${headerStyles.nav}`} ref={nav}>
        <Link to="/">
          <Logo className={headerStyles.nav__logo} />
        </Link>
        <Link
          to={{
            pathname: 'https://github.com/MateuszUrb',
          }}
          target="_blank"
        >
          <div type="button" className={headerStyles.nav__BtnGitHub}>
            <GithubIcon />
          </div>
        </Link>
      </nav>
    </Router>
  );
};

const Content = () => {
  const headerOne = useRef(null);
  const headerContent = useRef(null);

  useEffect(() => {
    const header = headerOne.current;
    const content = headerContent.current;

    header.animate(
      [
        { transform: 'translateX(-100%)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ],
      {
        duration: 800,
        delay: 500,
        fill: 'forwards',
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    );

    content.animate(
      [
        { transform: 'translateY(-100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      {
        duration: 800,
        delay: 1200,
        fill: 'forwards',
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    );
  }, []);
  return (
    <div className={`${headerStyles.header__content} ${wrapper.container}`}>
      <h2 className={headerStyles.header__content__about} ref={headerOne}>
        Paper World is a place where you can find info about your favorites
        books
      </h2>
      <h4 className={headerStyles.header__content__intro} ref={headerContent}>
        <q>
          The greatest enemy of knowledge is not ignorance, it is the illusion
          of knowledge.” <br />― Daniel J. Boorstin
        </q>
      </h4>
    </div>
  );
};

const BookSVG = () => (
  <>
    <div className={headerStyles.landing}>
      <img src={Book} alt="book cover" className={headerStyles.landing__book} />
      <Content />
    </div>
  </>
);

export default Header;
