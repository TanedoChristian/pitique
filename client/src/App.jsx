import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/home-page";
import LoginPage from "./views/login-page";
import RegisterPage from "./views/register-page";
import RealtorDashboard from "./views/realtor-dashboard";
import RealtorAccount from "./views/realtor-account";
import RealtorBooking from "./views/realtor-booking";

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
      </Routes>
    </Router>
  );
};

export default App;
