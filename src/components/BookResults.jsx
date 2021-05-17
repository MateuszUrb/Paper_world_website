import bookResults from '../assets/styles/bookResultsSection.module.scss';
import { ReactComponent as ResultSVG } from '../assets/images/result_svg.svg';
import wrapper from '../assets/styles/contentWrapper.module.scss';

function BookResults() {
  return (
    <main className={bookResults.results__container}>
      <ResultSVG />
      <div className={wrapper.container}>
        <header className={bookResults.recommendation}>
          <p>Recommendation</p>
        </header>
      </div>
    </main>
  );
}

export default BookResults;
