import s from "./HomePage.module.css";

//redux
import { filmsSelector, isLoadingSelector } from "../../redux/selectors";

//components
import HeaderBanner from "../../components/HeaderBanner/HeaderBanner";
import Loader from "../../components/Loader/Loader";
import FilmsList from "../../components/FilmsList/FilmsList";
import PopularFilmsFilter from "../../components/PopularFilmsFilter/PopularFilmsFilter";

import { useSelector } from "react-redux";
import PageButtonsList from "../../components/pageButtonsList/pageButtonsList";

const HomePage = () => {
  const films = useSelector(filmsSelector);
  const loading = useSelector(isLoadingSelector);

  return (
    <>
      <HeaderBanner />
      <PopularFilmsFilter />
      <section className={s.section}>
        <PageButtonsList />
        {loading && <Loader />}
        <FilmsList films={films} />
      </section>
    </>
  );
};

export default HomePage;
