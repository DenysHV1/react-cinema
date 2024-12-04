import css from './HomeContainer.module.css'
import star from '../../assets/icons/star.png'
import filmImg from '../../assets/ImageFılm.jpg'

const HomeContainer = () => {
  return (
    <div className={css.container}>
      <div className={css.filter}>
        <div id="categoryes" className={css.filterCategoriesItem + ' anchor'}>
          <div className={css.filterCategoriesFlex}>
            <div
              // onclick="changeActiveCategorySort(this)"
              className={css.filterCategoriesItem + ' active-category'} 
            >
              <p>Popular</p>
              <span></span>
            </div>
            <div
              // onclick="changeActiveCategorySort(this)"
              className={css.filterCategoriesItem}
            >
              <p>Novelty</p>
              <span></span>
            </div>
            <div
              // onclick="changeActiveCategorySort(this)"
              className={css.filterCategoriesItem}
            >
              <p>Featured</p>
              <span></span>
            </div>
            <div
              // onclick="changeActiveCategorySort(this)"
              className={css.filterCategoriesItem}
            >
              <p>Short films</p>
              <span></span>
            </div>
          </div>
          <span></span>
        </div>
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
        <div className={css.filterSearch}>
          <input type="text" placeholder="Search..." />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div id="movies" className={css.movies + ' anchor'} >
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
      <div className={css.movieScroll}>
        <button>
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
};

export default HomeContainer;
