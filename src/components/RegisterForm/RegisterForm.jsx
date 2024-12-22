import s from "./RegisterForm.module.css";
import validationSchema from "./validationSchema";
import toast from "react-hot-toast";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";

//redux
import {
  createRequestTokenThunk,
  createSessionThunk,
  validateTokenWithLoginThunk,
} from "../../redux/auth/authThunks";
import { selectSessionIdAuth } from "../../redux/auth/authSelectors";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionId = useSelector(selectSessionIdAuth);

  const handleSubmit = async (values, actions) => {
    try {
      //1
      const tokenResult = await dispatch(createRequestTokenThunk()).unwrap();

      console.log(tokenResult);

      //2
      const validatedToken = await dispatch(
        validateTokenWithLoginThunk({
          username: values.name.trim(),
          password: values.password.trim(),
          requestToken: tokenResult,
        })
      ).unwrap();
      console.log(validatedToken);

      //3
      await dispatch(createSessionThunk(validatedToken)).unwrap();

      console.log(sessionId);

      toast("Registration successful!", { icon: "✅" });
      actions.resetForm();
      navigate("/account");
    } catch (error) {
      toast(`Registration failed: ${error.message || "Unknown error"}`, {
        icon: "❌",
      });
      actions.resetForm();
    }
  };

  return (
    <section className={s.section}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <label className={s.label}>
              Username
              <Field type="text" name="name" className={s.input} />
              <ErrorMessage name="name" component="div" className={s.error} />
            </label>
            <label className={s.label}>
              Email
              <Field type="email" name="email" className={s.input} />
              <ErrorMessage name="email" component="div" className={s.error} />
            </label>
            <label className={s.label}>
              Password
              <Field type="password" name="password" className={s.input} />
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </label>
            <button
              type="submit"
              className={s.registerButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterForm;
