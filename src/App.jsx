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
import Dashboardnav from "./dashboardLayout/Dashboard";
import Dashboard from "./pages/user/Dashboard";
import Messages from "./pages/user/Messages";
import Notifications from "./pages/user/Notifications";
import CreateCampaign from "./pages/user/CreateCampaign";
import UserCampaign from "./pages/user/UserCampaign";

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

      <Route element={<Dashboardnav type="user" />}>
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/messages" element={<Messages />} />
        <Route path="/user/notifications" element={<Notifications />} />
        <Route path="/user/create-campaign" element={<CreateCampaign />} />
        <Route path="/user/all-campaign" element={<UserCampaign />} />
      </Route>
    </Routes>
  );
};

export default App;
