import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "/utils";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div>
      <nav className="navbar bg-body-green navv">
        <form className="container-fluid justify-content-even">
          <button className="btn btn-outline-info me-2 " type="button">
            <Link to="/upload" className="text-decoration-none ">
              Upload File
            </Link>
          </button>
          <button className="btn btn-outline-info me-2" type="button">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </button>
          <button className="btn btn-outline-info" type="button">
            <Link to="/data" className="text-decoration-none">
              {" "}
              Pandemic Data
            </Link>
          </button>
          {loggedInUser ? (
            <>
              <p className="Weluser">Welcome {loggedInUser}</p>
              <button className="btn btn-outline-info" type="button">
                <Link
                  to="/home"
                  className="text-decoration-none"
                  onClick={handleLogout}
                >
                  {" "}
                  Logout
                </Link>
              </button>
            </>
          ) : (
            <button className="btn btn-outline-info" type="button">
              <Link to="/login" className="text-decoration-none">
                {" "}
                Login
              </Link>
            </button>
          )}
        </form>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
