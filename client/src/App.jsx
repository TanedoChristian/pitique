import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/homePage";
import LoginPage from "./views/loginPage";
import RegisterPage from "./views/registerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
