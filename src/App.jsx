import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ExploreDetail from "./pages/ExploreDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Campaign from "./pages/campaign/Campaign";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<Layout type="home" />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:id" element={<ExploreDetail />} />
        <Route path="/campaign" element={<Campaign />} />
      </Route>
      <Route element={<Layout type="other" />}>
        <Route path="/explore" element={<Explore />} />
      </Route>
    </Routes>
  );
};

export default App;
