import css from "./SearcherFilms.module.css";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addName } from "../../redux/searchPage/reducer";

const SearchFilms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.name.value.trim().toLowerCase();
    if (!query) {
      return;
    }
    dispatch(addName(query.toLowerCase().trim()));
    navigate("/search");
    e.target.reset();
  };

  return (
    <form className={css.search_form} onSubmit={handleSubmit}>
      <input
        className={css.search_input}
        type="text"
        name="name"
        placeholder="search film by name"
      />
      <button className={css.search_button} type="submit">
        <ImSearch className={css.search_svg} />
      </button>
    </form>
  );
};

export default SearchFilms;
