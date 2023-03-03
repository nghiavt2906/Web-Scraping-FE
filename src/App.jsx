import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/authentication/login/Login";
import Signup from "./pages/authentication/signup/Signup";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
