import s from "./Layout.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";

//redux
import { isOpenSelector } from "../../redux/filmsPage/selectors";
import { closeMenu, toggleMenu } from "../../redux/filmsPage/reducers";

//router
import { NavLink, Outlet } from "react-router";

//icons
import { TiThMenuOutline } from "react-icons/ti";
import { SiReactos } from "react-icons/si";

//components
import SearcherFilms from "../SearcherFilms/SearcherFilms";
import { IoCloseSharp } from "react-icons/io5";
const Layout = () => {
  const activeLink = ({ isActive }) => {
    return isActive
      ? [s.activeLink, s.navLink].join(" ")
      : [s.unActiveLink, s.navLink].join(" ");
  };

  const isOpenModal = useSelector(isOpenSelector);
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <header className={s.header}>
        <nav className={s.nav}>
          <NavLink to={"/"} className={activeLink}>
            <SiReactos className={s.logo} /> Cinema
          </NavLink>
          <div className={s.menuDesctop}>
            <ul className={s.menu}>
              <li>
                <NavLink to={"/films"} className={activeLink}>
                  Films
                </NavLink>
              </li>
            </ul>
          </div>

          <button
            className={s.burgerMenu}
            onClick={() => dispatch(toggleMenu())}
          >
            <TiThMenuOutline />
          </button>
        </nav>
        <SearcherFilms />
      </header>
      <div
        className={
          isOpenModal ? [s.mobileMenu, s.isOpen].join(" ") : s.mobileMenu
        }
      >
        <nav className={s.mobileInner}>
          <button className={s.closeMenu} onClick={() => dispatch(closeMenu())}>
            <IoCloseSharp />
          </button>

          <NavLink
            to={"/"}
            className={activeLink}
            onClick={() => dispatch(closeMenu())}
          >
            <SiReactos className={s.logo} /> Cinema
          </NavLink>
          <NavLink
            to={"/films"}
            className={activeLink}
            onClick={() => dispatch(closeMenu())}
          >
            Films
          </NavLink>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
