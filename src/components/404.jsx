import { Link, useLocation } from 'react-router-dom';
import styled from '../assets/styles/pageNotFound.module.scss';
import wrapper from '../assets/styles/contentWrapper.module.scss';
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';

const NotFound = () => {
  const location = useLocation();
  return (
    <main className={styled.pageNotFound}>
      <ResultSVG />
      <div className={wrapper.container}>
        <div className={styled.pageNotFound__wrapper}>
          <p className={styled.pageNotFound__number}>404</p>
          <h1 className={styled.pageNotFound__title}>
            Oops! You run out of pages
          </h1>
          <p className={styled.pageNotFound__description}>
            We can't find the page <code>"{location.pathname}"</code>, please
            head back to home
          </p>
          <Link className={styled.pageNotFound__backToHome_Link} to="/">
            HOME PAGE
          </Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
