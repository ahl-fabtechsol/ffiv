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
import CreateCampaign from "./pages/user/createCampaign/CreateCampaign";
import UserCampaign from "./pages/user/UserCampaign";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAllCampaigns from "./pages/admin/AdminAllCampaigns";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminMessages from "./pages/admin/AdminMessages";
import Payment from "./pages/Payment";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import EditCampaign from "./pages/user/EditCampaign";
import Backed from "./pages/user/Backed";
import Setting from "./pages/user/Setting";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/payment_success" element={<SuccessPage />} />
      <Route path="/payment_cancel" element={<CancelPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<Layout type="home" />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/explore/:id"
          element={
            <ProtectedRoute roles={["AD", "U", "M"]}>
              <ExploreDetail />
            </ProtectedRoute>
          }
        />

        <Route path="/campaign" element={<Campaign />} />
      </Route>
      <Route element={<Layout type="other" />}>
        <Route
          path="/explore"
          element={
            <ProtectedRoute roles={["AD", "U", "M"]}>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={["AD", "M", "U"]}>
            <Dashboardnav type="user" />
          </ProtectedRoute>
        }
      >
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/messages" element={<Messages />} />
        <Route path="/user/notifications" element={<Notifications />} />
        <Route path="/user/create-campaign" element={<CreateCampaign />} />
        <Route path="/user/all-campaign" element={<UserCampaign />} />
        <Route path="/user/edit-campaign/:id" element={<EditCampaign />} />
        <Route path="/user/backed" element={<Backed />} />
        <Route path="/user/setting" element={<Setting />} />
      </Route>
      <Route
        element={
          <ProtectedRoute roles={["AD"]}>
            <Dashboardnav type="admin" />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/campaigns" element={<AdminAllCampaigns />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
};

export default App;
