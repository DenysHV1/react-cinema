import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchDetailsAboutFilmByID } from "../../redux/films/thunkFetchFilms";
import { filmDetailsSelector } from "../../redux/films/filmsSelectors";

const FilmDetails = () => {
  const { filmID } = useParams();
  const filmData = useSelector(filmDetailsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchDetailsAboutFilmByID(filmID));
  }, [dispatch, filmID]);

  console.log(filmData);

  const {
    budget,
    genres,
    id,
    origin_country,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    runtime,
    status,
    tagline,
    title,
    vote_average,
  } = filmData;

  return <section></section>;
};

export default FilmDetails;
