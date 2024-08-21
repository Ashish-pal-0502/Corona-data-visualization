import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar bg-body-green">
        <form className="container-fluid justify-content-even">
          <button className="btn btn-outline-info me-2 " type="button">
            <Link to="/upload" className="text-decoration-none ">
              Click to Upload
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
              Watch Data
            </Link>
          </button>

          <button className="btn btn-outline-info" type="button">
            <Link to="/login" className="text-decoration-none">
              {" "}
              Login
            </Link>
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
