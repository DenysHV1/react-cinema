import s from "./MobileMenu.module.css";

import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//icons
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { SiReactos } from "react-icons/si";
import { FaUserSecret } from "react-icons/fa";

//redux
import { selectIsLoggedInAuth } from "../../../redux/auth/authSelectors";
import { isOpenSelector } from "../../../redux/filmsPage/selectors";
import { closeMenu } from "../../../redux/filmsPage/reducers";

const MobileMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedInAuth);
  const isOpenModal = useSelector(isOpenSelector);
  const dispatch = useDispatch();

  const activeLink = ({ isActive }) => {
    return isActive
      ? [s.activeLink, s.navLink].join(" ")
      : [s.unActiveLink, s.navLink].join(" ");
  };

  return (
    <div
      className={
        isOpenModal ? [s.mobileMenu, s.isOpen].join(" ") : s.mobileMenu
      }
    >
      <nav className={s.mobileInner}>
        <button className={s.closeMenu} onClick={() => dispatch(closeMenu())}>
          <IoCloseSharp />
        </button>
        <ul className={s.top_list}>
          <li>
            <NavLink
              to={"/"}
              className={activeLink}
              onClick={() => dispatch(closeMenu())}
            >
              <SiReactos className={s.logo} /> Cinema
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/films"}
              className={activeLink}
              onClick={() => dispatch(closeMenu())}
            >
              Films
            </NavLink>
          </li>
        </ul>
        <ul className={s.bottom_list}>
          {isLoggedIn && (
            <li className={s.user_item}>
              <NavLink
                to={"/account"}
                className={activeLink}
                onClick={() => dispatch(closeMenu())}
              >
                <FaUserSecret />
                User
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button type="button" className={s.logout_btn}>
                <IoLogOutOutline />
              </button>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink
                to={"/login"}
                className={activeLink}
                onClick={() => dispatch(closeMenu())}
              >
                Login
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink
                to={"/register"}
                className={activeLink}
                onClick={() => dispatch(closeMenu())}
              >
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
