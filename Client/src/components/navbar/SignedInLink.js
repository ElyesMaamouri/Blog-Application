import React from "react";
import { NavLink } from "react-router-dom";
const SignedInLink = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Dev.To
          </NavLink>

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link active" to="/">
                Home
              </NavLink>
              <div
                className="nav-item dropdown"
                aria-labelledby="navbarDropdown"
              >
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>

                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li>
              </div>
              <NavLink className="nav-item nav-link" to="/contact">
                Contact
              </NavLink>
            </div>
            <form className="d-flex">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button type="button" className="btn btn-secondary">
                  <i className="bi-search"></i>
                </button>
              </div>
            </form>
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/signin">
                Login
              </NavLink>

              <NavLink className="nav-item nav-link" to="/signup">
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SignedInLink;
