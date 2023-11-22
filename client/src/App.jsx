import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/home-page";
import LoginPage from "./views/login-page";
import RegisterPage from "./views/register-page";
import RealtorDashboard from "./views/realtor-dashboard";
import RealtorAccount from "./views/realtor-account";
import RealtorBooking from "./views/realtor-booking";
import RealtorTransaction from "./views/realtor-transaction";
import PitiqueDashboard from "./views/pitique-dashboard";
import PitiqueBookingLayout from "./components/pitique-booking-layout/layout";
import PitiqueBooking from "./views/pitique-booking";
import PitiqueBookingId from "./views/pitique-booking-id";
import PitiqueProfile from "./views/pitique-profile";
import PitiqueServiceReport from "./views/pitique-service-report";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/register/account-details"
          element={<RegisterPage />}
        ></Route>

        <Route path="/dashboard" element={<RealtorDashboard />}></Route>
        <Route path="/account" element={<RealtorAccount />}></Route>
        <Route path="/booking" element={<RealtorBooking />}></Route>
        <Route path="/transaction" element={<RealtorTransaction />}></Route>
        {/* Test route only */}
        <Route path="/dashboard/pitique" element={<PitiqueDashboard />}></Route>
        <Route path="/booking/pitique" element={<PitiqueBooking />}></Route>
        <Route
          path="/booking/pitique/:id"
          element={<PitiqueBookingId />}
        ></Route>

        <Route path="/profile/pitique/:id" element={<PitiqueProfile />}></Route>
        <Route
          path="/report/pitique"
          element={<PitiqueServiceReport />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
