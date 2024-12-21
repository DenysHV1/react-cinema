import { Link } from "react-router";
import css from "./HeaderBanner.module.css";

import bannerVideo from "../../assets/bannerVideo.mp4";
import bannerBg from "../../assets/background.jpg";

const HeaderBanner = () => {
  return (
    <section className={css.headerBanner}>
      <div>
        <p>REACT FILMS</p>
        <p>
        Explore more about our journey, dive into exciting details, and get inspired as you scroll down!
        </p>
        <div>
          <Link to="films">Movies</Link>
        </div>
      </div>
      <video autoPlay muted loop>
        <source src={bannerVideo} type="video/mp4" />
      </video>
      <img src={bannerBg} alt="banner background" />
    </section>
  );
};

export default HeaderBanner;
