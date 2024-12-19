import { useParams } from "react-router";
import s from "./Cast.module.css";
import { useDispatch, useSelector } from "react-redux";
import { castSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { useEffect, useState } from "react";
import { getCastThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import { imgLink } from "../../../redux/helpSettings";
import { FcLike } from "react-icons/fc";

const Cast = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();

  const cast = useSelector(castSelector);

  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [elements, setElements] = useState(8);
  const [btnText, setBtnText] = useState('Show more')

  useEffect(() => {
    dispatch(getCastThunk(filmID));
  }, [dispatch, filmID]);

useEffect(() => {
	if(cast?.length > 8){
		setShowMoreBtn(true)
	}

	if(cast?.length > elements) {
		setBtnText('Show more')
	}else{
		setBtnText('hide')
	}
},[cast, elements])

const handlerShowMore = () => {
if(cast?.length > elements) {
	setBtnText('Show more')
	setElements(prevEl => prevEl += 8)
}else{
	setElements(8)
}
}
 
  return (
    <>
      <ul className={s.cast_list}>
        {cast?.length > 0 &&
          cast.map(({ character, name, id, popularity, profile_path, original_name }, idx) => profile_path && idx < elements && (
            <li key={id}>
				<div className={s.cast_item}>
					<div className={s.img_container}>
						<img src={`${imgLink}${profile_path}`} alt={name ? name : character}/>
						<span className={s.popularity}><FcLike />{Math.ceil(popularity)}</span>
					</div>
					<div className={s.name_block}>
						<p className={s.name_title}>Name: </p>
						<p className={s.name}>{name ? name : original_name}</p>
					</div>
					<div className={s.character_block}>
						<p className={s.character_title}>Character: </p>
						<p className={s.character}>{character ? character : original_name}</p>
					</div>
				</div>
			</li>
          ))}
      </ul>
	  {showMoreBtn && <button className={s.showMore} onClick={handlerShowMore}>{btnText}</button>}
    </>
  );
};

export default Cast;
