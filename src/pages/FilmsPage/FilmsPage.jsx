import { useSelector } from "react-redux";

//redux
import {
  filmsSelector,
  isLoadingSelector,
} from "../../redux/filmsPage/selectors";
import PopularFilmsFilter from "../../components/FilmPageComponents/PopularFilmsFilter/PopularFilmsFilter";

//components
import Loader from "../../components/Loader/Loader";
import FilmsList from "../../components/FilmsList/FilmsList";
import ButtonsList from "../../components/FilmPageComponents/ButtonsList/ButtonsListCinema";

const FilmsPage = () => {
  const films = useSelector(filmsSelector);
  const loading = useSelector(isLoadingSelector);

  return (
    <>
      <PopularFilmsFilter />
      {loading && <Loader />}
      <FilmsList films={films} />
      <ButtonsList />
    </>
  );
};

export default FilmsPage;
