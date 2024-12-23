import s from "./Layout.module.css";

import { Outlet } from "react-router";

//components
import MobileMenu from "./MobileMenu/MobileMenu";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <DesktopMenu />
      </header>
      <MobileMenu />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
