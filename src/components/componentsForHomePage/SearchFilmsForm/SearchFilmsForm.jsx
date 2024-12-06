import css from "./SearchFilmsForm.module.css";

const SearchFilmsForm = () => {
  return (
    <form className={css.filterSearch}>
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </form>
  );
};

export default SearchFilmsForm;
