import { ReactComponent as Logo } from '../assets/images/Logo.svg';
import { ReactComponent as GithubIcon } from '../assets/images/github-square.svg';
// import { ReactComponent as BgPatternMobile } from '../assets/images/Mobile_bg_patterns.svg';
import { ReactComponent as BgPatternDesktop } from '../assets/images/Desktop_bg_pattern.svg';
import Book from '../assets/images/book.webp';
import { ReactComponent as BookBackground } from '../assets/images/book_wave.svg';
import headerStyles from '../assets/styles/header.module.scss';
import wrapper from '../assets/styles/contentWrapper.module.scss';

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

const Nav = () => (
  <nav className={`${wrapper.container} ${headerStyles.nav}`}>
    <Logo className={headerStyles.nav__logo} />
    <div type="button" className={headerStyles.nav__BtnGitHub}>
      <GithubIcon />
    </div>
  </nav>
);

const Content = () => (
  <div className={`${headerStyles.header__content} ${wrapper.container}`}>
    <h2 className={headerStyles.header__content__about}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
    </h2>
    <h4 className={headerStyles.header__content__intro}>
      Nec pellentesque id ipsum volutpat aliquam ac turpis
    </h4>
  </div>
);

const BookSVG = () => (
  <>
    <div className={headerStyles.landing}>
      <img src={Book} alt="book cover" className={headerStyles.landing__book} />
      <Content />
    </div>
  </>
);

export default Header;
