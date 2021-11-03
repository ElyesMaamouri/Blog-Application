import React from "react";
import { NavLink } from "react-router-dom";

import decodeTokens from "../../helpers/decodeToken";
import "./navbar.css";
const SignedOutLinks = () => {
  const currentlyUser = decodeTokens(localStorage.getItem("userDetails"));

  const logoutHandler = () => {
    localStorage.removeItem("userDetails");

    window.location.reload();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            Dev.To
          </a>
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
            <div className=" nav-item dropdown show right_nav    ">
              <img
                className=" avatar user_logo"
                src={`http://localhost:4000/${currentlyUser.avatar}`}
                // src={require("../../assets/user.svg").default}
                alt="Avatar"
              />
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle user-action"
                aria-expanded="true"
                style={{ textDecoration: "none" }}
              >
                {currentlyUser.name} <b className="caret"></b>
              </a>
              <div className="dropdown-menu  ">
                <NavLink
                  to="/update-profile"
                  style={{ textDecoration: "none" }}
                >
                  <a href="#" className="dropdown-item">
                    <i className="fa fa-user-o"></i> Profile
                  </a>
                </NavLink>
                <a href="#" className="dropdown-item">
                  <i className="fa fa-calendar-o"></i> Calendar
                </a>
                <a href="#" className="dropdown-item">
                  <i className="fa fa-sliders"></i> Settings
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item" onClick={logoutHandler}>
                  <i class="bi bi-box-arrow-right"></i> Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SignedOutLinks;
