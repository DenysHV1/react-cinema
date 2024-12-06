import css from "./FilterCategories.module.css";

const FilterCategories = () => {
  return (
    <div id="categoryes" className={css.filterCategories}>
      <button>Popular</button>
      <button>Novelty</button>
      <button>Featured</button>
      <button>Short films</button>
    </div>
  );
};

export default FilterCategories;
