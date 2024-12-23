import s from "./FavoritesPage.module.css";

import { NavLink, Outlet } from "react-router";

const FavoritesPage = () => {
  const activeLink = ({ isActive }) => {
    return isActive
      ? [s.activeLink, s.navLink].join(" ")
      : [s.unActiveLink, s.navLink].join(" ");
  };

  return (
    <>
      <section>
        <nav className={s.nav}>
          <NavLink to={`userVideos`} className={activeLink}>
            My videos
          </NavLink>
          <NavLink to={`userFilms`} className={activeLink}>
            My films
          </NavLink>
        </nav>
      </section>
      <section style={{ minHeight: "90vh" }}>
        <Outlet />
      </section>
    </>
  );
};

export default FavoritesPage;
