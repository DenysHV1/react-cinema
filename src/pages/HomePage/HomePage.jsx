import s from "./HomePage.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//redux
import {
  homePageChanges2Selector,
  homePageChangesSelector,
  homePageErrorSelector,
  homePageLoadingSelector,
} from "../../redux/homePage/homeSelector";
import { getChangesThunk } from "../../redux/homePage/homeThunk";

//components
import HeaderBanner from "../../components/HeaderBanner/HeaderBanner";
import FilmsSlider from "../../components/FilmSlider/FilmSlider";
import NoInfo from "../../components/NoInfo/NoInfo";
import Loader from "../../components/Loader/Loader";
import FilmSliderMain from "../../components/FilmSliderMain/FilmSliderMain";
import { searchUpcoming } from "../../redux/filmsPage/thunkFilteredTopFilms";
import { selectUpcoming } from "../../redux/filmsPage/selectors";
import LastVideos from "../../components/LastVideos/LastVideos";

const HomePage = () => {
  const dispatch = useDispatch();
  const changes = useSelector(homePageChangesSelector);
  const changes2 = useSelector(homePageChanges2Selector);
  const isError = useSelector(homePageErrorSelector);
  const isLoading = useSelector(homePageLoadingSelector);

  const upcoming = useSelector(selectUpcoming)

  useEffect(() => {
    dispatch(getChangesThunk(1));
    dispatch(getChangesThunk(2));
    dispatch(searchUpcoming())
  }, [dispatch]);

  return (
    <>
      <HeaderBanner />
      <LastVideos/>
      {/* <FilmSliderMain list={upcoming}/> */}
      {isLoading && <Loader />}
      {!isError ? (
        <section>
          <h1 className={s.title}>Now Playing</h1>
          <FilmsSlider list={changes} />
          <FilmsSlider list={changes2} />
        </section>
      ) : (
        <NoInfo info="last films" />
      )}
    </>
  );
};

export default HomePage;
