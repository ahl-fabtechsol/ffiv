import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ExploreDetail from "./pages/ExploreDetail";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout type="home" />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:id" element={<ExploreDetail />} />
      </Route>
      <Route element={<Layout type="other" />}>
        <Route path="/explore" element={<Explore />} />
      </Route>
    </Routes>
  );
};

export default App;
