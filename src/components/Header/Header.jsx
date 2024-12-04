import { NavLink } from "react-router";
import css from "./Header.module.css";

import logo from "..//../assets/icons/pngwing.com.png";
import heart from "../../assets/icons/icons8-червы-100.png";

const Header = () => {
  return (
    <header>
      <NavLink className={css.headerLogoFlex} to={"/"}>
        <img src={logo} alt="logo" />
        <div className={css.headerLogoFlexSitename}>
          <p>REACT</p>
          <p>CINEMA</p>
        </div>
      </NavLink>
      <ul className={css.headerNavbarFlex}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/favorites"}>Favorites</NavLink>
        <a href="#categoryes">Movies</a>
        <a href="#categoryes">FAQ</a>
        <a href="#categoryes">Help</a>
      </ul>
      <div className={css.headerAuthFlex}>
        <div className={css.favoritesMovies}>
          <img src={heart} alt="heart" />
          <p>0</p>
        </div>
        <NavLink to={"/favorites"}>Account</NavLink>
      </div>
    </header>
  );
};
export default Header;
