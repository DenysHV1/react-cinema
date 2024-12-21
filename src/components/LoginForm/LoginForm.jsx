import css from "./LoginForm.module.css";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    if (!values.email || !values.password) {
      toast("Field is empty", { icon: "❌" });
      return;
    }

    // dispatch(
    //   logIn({
    //     email: values.email.trim(),
    //     password: values.password.trim(),
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     toast.success('login success');
    //   })
    //   .catch(() => {
    //     toast.error('login error');
    //   });

    actions.resetForm();
  };

  return (
    <section>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={css.form}>
        IN PROGRESS
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />
          </label>
          <button type="submit" className={css.loginButton}>
            Log In
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default LoginForm;
