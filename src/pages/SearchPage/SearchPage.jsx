import { useDispatch, useSelector } from "react-redux";
import BackLink from "../../components/BackLink/BackLink";
import FilmsList from "../../components/FilmPageComponents/FilmsList/FilmsList";
import { searchedErrorSelector, searchedInfoSelector, searchedNameSelector } from "../../redux/searchPage/selectors";
import { useEffect } from "react";
import { searchThunk } from "../../redux/searchPage/thunk";

const SearchPage = () => {
	const dispatch = useDispatch();
	const error = useSelector(searchedErrorSelector);
	const list = useSelector(searchedInfoSelector);
	const name = useSelector(searchedNameSelector)
	console.log(list);

	useEffect(() => {
		dispatch(searchThunk(name))
	},[dispatch, name])
	
  return (
    <section>
      <BackLink link={"/films"} />
	  {!error && <FilmsList films={list}/>}
    </section>
  );
};

export default SearchPage;
