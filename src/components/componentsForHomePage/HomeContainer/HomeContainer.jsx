import css from "./HomeContainer.module.css";
import star from "../../../assets/icons/star.png";
import filmImg from "../../../assets/ImageFılm.jpg";
import SearchFilmsForm from "../SearchFilmsForm/SearchFilmsForm";
import FilterCategories from "../../FilterCategories/FilterCategories";
import FilterButtons from "../../FilterButtons/FilterButtons";


const HomeContainer = () => {
  return (
    <div className={css.container}>
      <div className={css.filter}>
        <FilterCategories/>
        <FilterButtons />
        <SearchFilmsForm />
      </div>
      <div id="movies" className={css.movies + " anchor"}>
        <a className={css.movieCard} href="#">
          <div className={css.movieCardRating}>
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
          </div>
          <img src={filmImg} alt="film image" />
        </a>
      </div>

    </div>
  );
};

export default HomeContainer;
