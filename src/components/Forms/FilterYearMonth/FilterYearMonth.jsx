import { Field, Form, Formik } from "formik";
import { BsSearchHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { changeFilmsDate } from "../../../redux/films/filmsReducer";
import s from './FilterYearMonth.module.css'

const FilterYearMonth = () => {
  const yearArr = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024,
  ];

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (
      !values.year ||
      !values.month ||
      values.year === "2024" ||
      values.month === "JANUARY"
    ) {
      return;
    }
    dispatch(changeFilmsDate(values));
  };

  return (
    <Formik
      initialValues={{ year: "2024", month: "JANUARY" }}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <Field as="select" name="year" className={s.field}>
          {yearArr.map((year, idx) => (
            <option key={idx} value={year}>
              🎬 {year}
            </option>
          ))}
        </Field>

        <Field as="select" name="month" className={s.field}>
          <option value="JANUARY">🎬 January</option>
          <option value="FEBRUARY">🎬 February</option>
          <option value="MARCH">🎬 March</option>
          <option value="APRIL">🎬 April</option>
          <option value="MAY">🎬 May</option>
          <option value="JUNE">🎬 June</option>
          <option value="JULY">🎬 July</option>
          <option value="AUGUST">🎬 August</option>
          <option value="SEPTEMBER">🎬 September</option>
          <option value="OCTOBER">🎬 October</option>
          <option value="NOVEMBER">🎬 November</option>
          <option value="DECEMBER">🎬 December</option>
        </Field>
        <button type="submit" className={s.button}>
          <BsSearchHeart style={{ color: "white" }} />
        </button>
      </Form>
    </Formik>
  );
};

export default FilterYearMonth;
