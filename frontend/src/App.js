import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// pages & components
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Books from "./pages/Books";
import Return from "./pages/Return";
import Create from "./pages/Create";
import Home from "./pages/Home";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages container">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/books" element={<Books />} />
            <Route path="/return" element={<Return />} />
            <Route path="/create" element={<Create />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
