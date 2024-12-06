import FilterButtons from "../../FilterButtons/FilterButtons";
import FilterCategories from "../../FilterCategories/FilterCategories";
import FavoritesPageBanner from "../FavoritesPageBanner/FavoritesPageBanner";

const FavoritesPageContainer = () => {
  return (
    <>
      <FavoritesPageBanner />
      <FilterCategories />
      <FilterButtons />
    </>
  );
};

export default FavoritesPageContainer;
