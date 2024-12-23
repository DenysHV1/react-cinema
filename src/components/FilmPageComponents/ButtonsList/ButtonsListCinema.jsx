import s from "./ButtonsListCinema.module.css";

//redux
import {
  filterVariantSelector,
  totalPagesSelector,
} from "../../../redux/filmsPage/selectors";
import {
  searchPopularByPage,
  searchTopRatedByPage,
  searchUpcomingByPage,
  searchPremiersFilmsByPage,
} from "../../../redux/filmsPage/thunkFilteredTopFilms";

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonsList = () => {
  const totalPages = useSelector(totalPagesSelector);
  const variant = useSelector(filterVariantSelector);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  const dispatch = useDispatch();

  const handleChangePage = (item) => {
    switch (variant) {
      case "POPULAR":
        dispatch(searchPopularByPage(item));
        break;
      case "TOP_RATED":
        dispatch(searchTopRatedByPage(item));
        break;
      case "UPCOMING":
        dispatch(searchUpcomingByPage(item));
        break;
      case "PREMIERS":
        dispatch(searchPremiersFilmsByPage(item));
        break;
      default:
        dispatch(searchPremiersFilmsByPage(item));
        break;
    }
  };

  return (
    <div className={s.buttons_container}>
      <ul className={s.buttonsList}>
        {pages?.length > 0 &&
          pages.map((item) => (
            <li key={`${item}bottom`}>
              <button
                onClick={() => handleChangePage(item)}
                className={s.buttonPage}
              >
                {item}
              </button>
            </li>
          ))}
      </ul>
      <span>...</span>
      <div>
        <button
          onClick={() => handleChangePage(totalPages)}
          className={s.buttonPage}
        >
          {totalPages}
        </button>
      </div>
    </div>
  );
};

export default ButtonsList;



// import s from "./ButtonsListCinema.module.css";

// //redux
// import {
//   filterVariantSelector,
//   totalPagesSelector,
// } from "../../../redux/filmsPage/selectors";
// import {
//   searchPopularByPage,
//   searchTopRatedByPage,
//   searchUpcomingByPage,
//   searchPremiersFilmsByPage,
// } from "../../../redux/filmsPage/thunkFilteredTopFilms";

// //hooks
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useInView } from "react-intersection-observer";

// const InfiniteScroll = () => {
//   const totalPages = useSelector(totalPagesSelector); // Общее количество страниц
//   const variant = useSelector(filterVariantSelector); // Тип фильтра
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1); // Текущая страница
//   const [isLoading, setIsLoading] = useState(false); // Индикатор загрузки

//   // Интерсекция для определения, когда загружать новые данные
//   const { ref, inView } = useInView({
//     threshold: 1.0, // Элемент должен быть полностью видимым
//   });

//   useEffect(() => {
//     if (inView && !isLoading && currentPage <= totalPages) {
//       loadNextPage(); // Загружаем следующую страницу
//     }
//   }, [inView]);

//   const loadNextPage = () => {
//     setIsLoading(true);

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

//     setCurrentPage((prev) => prev + 1); // Увеличиваем номер текущей страницы
//     setIsLoading(false);
//   };

//   return (
//     <div>
//       {/* Здесь должен быть рендер фильмов */}

//       {currentPage <= totalPages && (
//         <div ref={ref} className={s.loadingTrigger}>
//           {/* Заглушка или индикатор загрузки */}
//           {isLoading ? <p>Loading...</p> : <p>Scroll for more...</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InfiniteScroll;
