import css from "./HeaderBanner.module.css";

import bannerBg from "../../../assets/background.jpg";
import bannerVideo from "../../../assets/videos/Титаник (1997) «Titanic» - Трейлер (Trailer) - Что посмотреть_ (1080p, h264).mp4";

const HeaderBanner = () => {
  return (
    <div className={css.headerBanner}>
      <div>
        <p>REACT CINEMA</p>
        <p>
          Subheading that sets up context, shares more info about the website,
          or generally gets people psyched to keep scrolling.{" "}
        </p>
        <div>
          <a href="#movies">Movies</a>
          <button>Favorites</button>
        </div>
      </div>
      <video autoPlay muted loop>
        <source src={bannerVideo} type="video/mp4" />
      </video>
      <img src={bannerBg} alt="banner background" />
    </div>
  );
};

export default HeaderBanner;
