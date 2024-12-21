import s from "./Layout.module.css";

import { Outlet } from "react-router";

//components
import MobileMenu from "./MobileMenu/MobileMenu";
import SearcherFilms from "../SearcherFilms/SearcherFilms";
import DesktopMenu from "./DesktopMenu/DesktopMenu";

const Layout = () => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <DesktopMenu />
        <SearcherFilms />
      </header>
      <MobileMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
