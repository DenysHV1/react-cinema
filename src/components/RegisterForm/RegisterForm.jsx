import s from "./RegisterForm.module.css";

import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    if (!values.name || !values.email || !values.password) {
      toast("Field is empty", { icon: "❌" });
      return;
    }
    // dispatch(
    //   register({
    //     name: values.name.trim(),
    //     email: values.email.trim(),
    //     password: values.password.trim(),
    //   })
    // );

    actions.resetForm();
  };

  return (
    <section className={s.section}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={s.form}>
          IN PROGRESS
          <label className={s.label}>
            Username
            <Field type="text" name="name" className={s.input} />
          </label>
          <label className={s.label}>
            Email
            <Field type="email" name="email" className={s.input} />
          </label>
          <label className={s.label}>
            Password
            <Field type="password" name="password" className={s.input} />
          </label>
          <button type="submit" className={s.registerButton}>
            Register
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default RegisterForm;
