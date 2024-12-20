import { useDispatch, useSelector } from "react-redux";
import s from './LoginPage.module.css'

import toast from "react-hot-toast";
import { createRequestTokenThunk, createSessionThunk } from "../../redux/auth/authThunks";
import { logout } from "../../redux/auth/authReducers";

const Login = () => {
  const dispatch = useDispatch();
  const { requestToken, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async () => {
    try {
      const token = await dispatch(createRequestTokenThunk()).unwrap();
      const authorizationURL = `https://www.themoviedb.org/authenticate/${token}`;
      window.open(authorizationURL, "_blank");
      toast.success(
        "Token created. Please authorize it and return to continue."
      );
    } catch (error) {
      toast.error("Error generating token: " + error);
    }
  };

  const handleCompleteLogin = async () => {
    try {
      if (!requestToken) {
        toast.error("No request token available. Please try logging in again.");
        return;
      }

      await dispatch(createSessionThunk(requestToken)).unwrap();
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Error creating session: " + error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  return (
    <section>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <>
          <button onClick={handleLogin} disabled={isLoading} className={s.loginButton}>
            Generate Token & Authorize
          </button>
          {requestToken && (
            <button onClick={handleCompleteLogin} disabled={isLoading} className={s.loginButton}>
              Complete Login
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Login;
