import { NavLink, Outlet } from "react-router";
import s from "./BottomMenuNav.module.css";
import { Suspense } from "react";
import Loader from "../../Loader/Loader";

const BottomMenuNav = () => {
  const setActive = ({ isActive }) =>
    isActive ? s.activeLink : s.noActiveLink;
  return (
    <section>
      <ul className={s.moreInfo}>
        <li className={s.moreInfo_item}>
          <NavLink to={"keywords"} className={setActive}>
            Keywords
          </NavLink>
        </li>
        <li className={s.moreInfo_item}>
          <NavLink to={"changes"} className={setActive}>
            Last Changes
          </NavLink>
        </li>
        <li className={s.moreInfo_item}>
          <NavLink to={"cast"} className={setActive}>
            Cast
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </section>
  );
};

export default BottomMenuNav;
