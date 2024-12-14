import s from "./Layout.module.css";

//components
import Loader from "../Loader/Loader";

//router
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router";

//icons
import { TiThMenuOutline } from "react-icons/ti";
import { BiLogIn } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { SiReactos } from "react-icons/si";

//redux
import { useDispatch, useSelector } from "react-redux";
import { isOpenSelector } from "../../redux/pagesLogic/pagesSelectors";
import {
  closeMenu,
  toggleMenu,
} from "../../redux/pagesLogic/pagesLogicReducer";

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
            <ul className={s.authNavPC}>
              <li>
                <NavLink to={"/login"} className={activeLink}>
                  <BiLogIn /> Login
                </NavLink>
              </li>
              <li>
                <NavLink to={"/register"} className={activeLink}>
                  <TbLogout2 /> Register
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
        <div
          className={
            isOpenModal ? [s.mobileMenu, s.isOpen].join(" ") : s.mobileMenu
          }
        >
          <nav className={s.mobileInner}>
            <button
              className={s.closeMenu}
              onClick={() => dispatch(closeMenu())}
            >
              <MdOutlineDoubleArrow />
            </button>

            <NavLink to={"/"} className={activeLink}>
              <SiReactos className={s.logo} /> Cinema
            </NavLink>
            <NavLink to={"/films"} className={activeLink}>
              Films
            </NavLink>
            <ul className={s.authPagesMobile}>
              <li>
                <NavLink to={"/login"} className={activeLink}>
                  <BiLogIn /> Login
                </NavLink>
              </li>
              <li>
                <NavLink to={"/register"} className={activeLink}>
                  <TbLogout2 />
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;