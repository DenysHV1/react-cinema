import s from "./ButtonsListCinema.module.css";

//redux
import { filterVariantSelector } from "../../../redux/filmsPage/selectors";
import {
  searchPopularByPage,
  searchTopRatedByPage,
  searchUpcomingByPage,
  searchPremiersFilmsByPage,
} from "../../../redux/filmsPage/thunkFilteredTopFilms";

//hooks
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonsList = () => {
  const variant = useSelector(filterVariantSelector);

  const [pages, setPages] = useState(1);
  const triggerRef = useRef(null);
  const dispatch = useDispatch();

  const variantActions = useMemo(
    () => ({
      POPULAR: searchPopularByPage,
      TOP_RATED: searchTopRatedByPage,
      UPCOMING: searchUpcomingByPage,
      PREMIERS: searchPremiersFilmsByPage,
    }),
    []
  );

  const handleChangePage = useCallback(
    (page) => {
      const action = variantActions[variant];
      dispatch(action(page));
    },
    [dispatch, variant, variantActions]
  );

  useEffect(() => {
    setPages(1);
    handleChangePage(1);
  }, [variant, handleChangePage]);

  const observeIntersection = useCallback(
    (entries) => {
      if (entries[0].isIntersecting) {
        setPages((prev) => {
          const newPage = prev + 1;
          handleChangePage(newPage);
          return newPage;
        });
      }
    },
    [handleChangePage]
  );

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px 50px 0px",
    };

    const observer = new IntersectionObserver(
      observeIntersection,
      observerOptions
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [observeIntersection]);

  console.log(pages);
  

  return <div ref={triggerRef} className={s.buttons_container}></div>;
};

export default ButtonsList;
