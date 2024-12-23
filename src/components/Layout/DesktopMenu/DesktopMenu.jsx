import s from "./DesktopMenu.module.css";
import { FaUserSecret } from "react-icons/fa";
import { SiReactos } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { selectSessionIdAuth } from "../../../redux/auth/authSelectors";
import { TiThMenuOutline } from "react-icons/ti";

import { toggleMenu } from "../../../redux/filmsPage/reducers";
import { IoLogOutOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import SearcherFilms from "../../SearcherFilms/SearcherFilms";
const DesktopMenu = () => {
  const sessionId = useSelector(selectSessionIdAuth);
  const dispatch = useDispatch();

  const activeLink = ({ isActive }) => {
    return isActive
      ? [s.activeLink, s.navLink].join(" ")
      : [s.unActiveLink, s.navLink].join(" ");
  };

  return (
    <>
      <nav className={s.nav}>
        <NavLink to={"/"} className={activeLink}>
          <SiReactos className={s.logo} /> Cinema
        </NavLink>
        <div className={s.menuDesctop}>

          <ul className={s.menu}>
            <li>
              <SearcherFilms />
            </li>
            <li>
              <NavLink to={"/films"} className={activeLink}>
                <BiMoviePlay className={s.films_svg} />
                Films
              </NavLink>
            </li>
            {sessionId && (
              <li>
                <NavLink to={"/account"} className={activeLink}>
                  <FaUserSecret />
                  User
                </NavLink>
              </li>
            )}
            {sessionId && (
              <li>
                <button type="button" className={s.logout_btn}>
                  <IoLogOutOutline />
                  Logout
                </button>
              </li>
            )}
            {!sessionId && (
              <li>
                <NavLink to={"/login"} className={activeLink}>
                  Login
                </NavLink>
              </li>
            )}
            {!sessionId && (
              <li>
                <NavLink to={"/register"} className={activeLink}>
                  Register
                </NavLink>
              </li>
            )}
          </ul>
          
        </div>
        <button className={s.burgerMenu} onClick={() => dispatch(toggleMenu())}>
          <TiThMenuOutline />
        </button>
        
      </nav>
    </>
  );
};

export default DesktopMenu;
