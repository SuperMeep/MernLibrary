import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <header>
      <div className="container">
        <div className="navlink">
          <div className="logo">
            <Link to="/">
              <h1>BookWise</h1>
            </Link>
          </div>
          {user && (
            <div className="navlinks_container">
              <Link
                to="/search"
                className={
                  location.pathname === "/search" ? "selected-link" : ""
                }>
                Search
              </Link>
              <Link
                to="/books"
                className={
                  location.pathname === "/books" ? "selected-link" : ""
                }>
                Books
              </Link>
              <Link
                to="/return"
                className={
                  location.pathname === "/return" ? "selected-link" : ""
                }>
                Return
              </Link>
              {user &&
                (user.isAuthorized ||
                  user.role === "librarian" ||
                  user.role === "admin") && (
                  <Link
                    to="/create"
                    className={
                      location.pathname === "/create" ? "selected-link" : ""
                    }>
                    Create
                  </Link>
                )}
            </div>
          )}
        </div>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button className="bn1" onClick={handleLogout}>
                {" "}
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="userLinks">
              <Link to="/login" className="userLink">
                <div className="material-symbols-outlined">Login</div>Login
              </Link>

              <Link to="/signup" className="userLink">
                <div className="material-symbols-outlined">Person</div> Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
