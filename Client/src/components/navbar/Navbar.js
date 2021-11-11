import React, { useState, useEffect } from "react";

import SignedOutLinks from "./SignedOutLinks";
import SignedInLink from "./SignedInLink";
import "./navbar.css";
const Navbar = () => {
  if (localStorage.getItem("userDetails") !== null) {
    return (
      <div>
        <SignedOutLinks />
      </div>
    );
  } else if (localStorage.getItem("userDetails") === null) {
    return (
      <div>
        <SignedInLink />
      </div>
    );
  }
};

export default Navbar;
