import css from "./FilterButtons.module.css";

const FilterButtons = () => {
  return (
    <div className={css.filterButtons}>
      <button>Movies</button>
      <button>Cinema</button>
      <button>Adventure</button>
      <button>Comedy</button>
      <button>Fantasy</button>
      <button>History</button>
      <button>Cartoon</button>
      <button>Detective</button>
      <button>Mysticism</button>
      <button>Drama</button>
    </div>
  );
};

export default FilterButtons;
