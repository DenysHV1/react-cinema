import { useSelector } from "react-redux";

// import InfiniteScroll from "react-infinite-scroll-component";

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



// import { useDispatch, useSelector } from "react-redux";

// // import InfiniteScroll from "react-infinite-scroll-component";

// //redux
// import {
//   filmsSelector,
//   filterVariantSelector,
//   isLoadingSelector,
//   totalPagesSelector,
// } from "../../redux/filmsPage/selectors";
// import PopularFilmsFilter from "../../components/FilmPageComponents/PopularFilmsFilter/PopularFilmsFilter";

// //components
// import Loader from "../../components/Loader/Loader";
// import FilmsList from "../../components/FilmsList/FilmsList";
// // import ButtonsList from "../../components/FilmPageComponents/ButtonsList/ButtonsListCinema";
// import {
//   searchPopularByPage,
//   searchPremiersFilmsByPage,
//   searchTopRatedByPage,
//   searchUpcomingByPage,
// } from "../../redux/filmsPage/thunkFilteredTopFilms";
// import { useEffect, useState } from "react";

// import InfiniteScroll from "react-infinite-scroll-component";

// const FilmsPage = () => {
//   const dispatch = useDispatch();
//   const films = useSelector(filmsSelector);
//   const loading = useSelector(isLoadingSelector);
//   const totalPages = useSelector(totalPagesSelector);
//   const variant = useSelector(filterVariantSelector);

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     switch (variant) {
//       case "POPULAR":
//         dispatch(searchPopularByPage(currentPage));
//         break;
//       case "TOP_RATED":
//         dispatch(searchTopRatedByPage(currentPage));
//         break;
//       case "UPCOMING":
//         dispatch(searchUpcomingByPage(currentPage));
//         break;
//       case "PREMIERS":
//         dispatch(searchPremiersFilmsByPage(currentPage));
//         break;
//       default:
//         dispatch(searchPremiersFilmsByPage(currentPage));
//         break;
//     }
//   }, [dispatch, variant, currentPage]);

//   // Function to load more films
//   const fetchMoreData = () => {
//     console.log("Fetching more data");
//     console.log("Current page:", currentPage);
//     console.log("Total pages:", totalPages);
//     console.log("Current films length:", films.length);
  
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => {
//         const nextPage = prev + 1;
//         console.log("Next page:", nextPage);
//         return nextPage;
//       });
//     }
//   };

//   useEffect(() => {
//     console.log("Films array has changed:", films);
//   }, [films]);
  

//   return (
//     <>
//       <PopularFilmsFilter />
//       {loading && currentPage === 1 && <Loader />}

//       <InfiniteScroll
//         dataLength={films?.length}
//         next={fetchMoreData}
//         hasMore={currentPage < totalPages}
//         loader={<h4>Loading...</h4>}
//       >
//         <FilmsList films={films} />
//       </InfiniteScroll>
//     </>
//   );
// };

// export default FilmsPage;
