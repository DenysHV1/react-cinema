import { Outlet } from "react-router";
import Header from "../Header/Header";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
	  <Footer/>
    </div>
  );
};

export default Layout;
