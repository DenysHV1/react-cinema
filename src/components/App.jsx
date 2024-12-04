import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Layout/Layout";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FavoritesPage")
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
