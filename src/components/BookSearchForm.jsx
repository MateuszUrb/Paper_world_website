import searchForm from '../assets/styles/bookSearchInput.module.scss';

export default function BookSearchForm() {
  return (
    <form className={searchForm.bookForm}>
      <input
        className={searchForm.bookForm__input}
        type="text"
        name="text"
        id="text"
      />
      <button className={searchForm.bookForm__button} type="submit">
        Search
      </button>
    </form>
  );
}
