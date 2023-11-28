import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/home-page";
import LoginPage from "./views/login-page";
import RegisterPage from "./views/register-page";
import RealtorDashboard from "./views/realtor-dashboard";
import RealtorAccount from "./views/realtor-account";
import RealtorBooking from "./views/realtor-booking";
import RealtorTransaction from "./views/realtor-transaction";
import PitiqueDashboard from "./views/pitique-dashboard";
import PitiqueBooking from "./views/pitique-booking";
import PitiqueBookingId from "./views/pitique-booking-id";
import PitiqueProfile from "./views/pitique-profile";
import PitiqueServiceReport from "./views/pitique-service-report";
import RealtorBookingId from "./views/realtor-booking-id";
import PitiquerSearchPage from "./views/pitiquer-search-page";
import RealtorProfilePage from "./views/realtor-profile-page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dashboard" element={<RealtorDashboard />}></Route>
        <Route path="/account" element={<RealtorAccount />}></Route>
        <Route path="/booking" element={<RealtorBooking />}></Route>
        <Route path="/booking/:id" element={<RealtorBookingId />}></Route>
        <Route path="/transaction" element={<RealtorTransaction />}></Route>
        <Route
          path="/search/pitiquer/:name"
          element={<PitiquerSearchPage />}
        ></Route>
        {/* Test route only */}
        <Route path="/dashboard/pitique" element={<PitiqueDashboard />}></Route>
        <Route path="/booking/pitique" element={<PitiqueBooking />}></Route>
        <Route
          path="/booking/pitique/:id"
          element={<PitiqueBookingId />}
        ></Route>

        <Route path="/profile/pitique/:id" element={<PitiqueProfile />}></Route>
        <Route path="/profile/realtor" element={<RealtorProfilePage />}></Route>
        <Route
          path="/report/pitique"
          element={<PitiqueServiceReport />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
