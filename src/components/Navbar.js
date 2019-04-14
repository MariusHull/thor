import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark">
        <Link to="/" className="navbar-brand">
          <img
            className="thor"
            src={require("../assets/thor.png")}
            alt="thor"
          />
          Thor
        </Link>
      </nav>
    );
  }
}

export default Navbar;
