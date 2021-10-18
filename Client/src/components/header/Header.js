import React from "react";
import "./header.css";
const Header = () => {
  return (
    <div>
      <section className="jumbotron text-center section-header">
        <div className="container ">
          <h1 className="jumbotron-heading">DEV TO</h1>
          <p className="lead text-muted mb-0">Recent tech article</p>
        </div>
      </section>
    </div>
  );
};

export default Header;
