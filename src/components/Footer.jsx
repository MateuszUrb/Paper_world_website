import styleFooter from '../assets/styles/footer.module.scss';
import containerWrapper from '../assets/styles/contentWrapper.module.scss';

import FbIcon from '../assets/images/icon_fb.svg';
import TwitterIcon from '../assets/images/icon_twitter.svg';
import MailIcon from '../assets/images/icon_mail.svg';
// import WavePattern from '../assets/images/footerWaves.webp';
// import { ReactComponent as FooterWave } from '../assets/images/footer.svg';

const Footer = () => (
  <>
    <footer className={styleFooter.footer}>
      <div
        className={`${containerWrapper.container} ${styleFooter.footer__content}`}
      >
        <ul className={styleFooter.footer__linkList}>
          <li>
            <img src={FbIcon} alt="facebook icon" />
          </li>
          <li>
            <img src={TwitterIcon} alt="twitter icon" />
          </li>
          <li>
            <img src={MailIcon} alt="mail icon" />
          </li>
        </ul>
        <p className={styleFooter.footer__creator}>
          created and designed by Mateusz
        </p>
        <p className={styleFooter.footer__copyright}>
          <i className="fas fa-copyright" />
          Copyright 2021, Mateusz Urban
        </p>
      </div>
    </footer>
  </>
);

export default Footer;
