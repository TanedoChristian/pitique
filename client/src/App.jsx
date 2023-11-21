import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./views/loginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello</div>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
