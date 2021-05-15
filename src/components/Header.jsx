import React from 'react';
import { ReactComponent as Logo } from '../assets/images/Logo.svg';
import { ReactComponent as GithubIcon } from '../assets/images/github-square.svg';
import { ReactComponent as BgPattern } from '../assets/images/Mobile_bg_patterns.svg';
import { ReactComponent as BookWaveBG } from '../assets/images/book_wave.svg';
import styles from '../assets/styles/header.module.scss';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__bg_pattern}>
          <BgPattern />
        </div>
        <div className="header__bookWave">
          <BookWaveBG />
        </div>
        <div className={styles.nav}>
          <Logo className={styles.nav__logo} />
          <div type="button" className={styles.nav__BtnGitHub}>
            <GithubIcon />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
