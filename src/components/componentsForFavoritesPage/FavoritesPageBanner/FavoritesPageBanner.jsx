import css from "./FavoritesPageBanner.module.css";

import bannerVideo from '../../../assets/videos/you look lonely.mp4';
import bannerBg from '../../../assets/background.jpg';

const FavoritesPageBanner = () => {
  return (
    <div className={css.favoritesPageBanner}>
      <video autoPlay muted loop>
        <source src={bannerVideo} type="video/mp4" />
      </video>
      <img src={bannerBg} alt="banner background" />
    </div>
  );
};

export default FavoritesPageBanner;
