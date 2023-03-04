import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/authentication/login/Login";
import Signup from "./pages/authentication/signup/Signup";
import Home from "./pages/home/Home";
import CheckAuth from "./components/CheckAuth";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<CheckAuth isProtectedRoute={false} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<CheckAuth isProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
