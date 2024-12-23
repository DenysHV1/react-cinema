import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'izitoast/dist/css/iziToast.min.css';
import "modern-normalize";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader/Loader.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
