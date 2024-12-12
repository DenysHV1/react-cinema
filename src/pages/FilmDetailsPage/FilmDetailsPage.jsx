import { useParams } from "react-router";

const FilmDetails = () => {
  const { filmID } = useParams();
  console.log(filmID);

  return <li></li>;
};

export default FilmDetails;
