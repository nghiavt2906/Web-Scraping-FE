import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import Home from "./pages/Home/Home";
import SearchResultDetail from "./pages/SearchResultDetail/SearchResultDetail";

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
            <Route
              path="/search-results/:id"
              element={<SearchResultDetail />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
