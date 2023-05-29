import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navbar = ({ history, isAuthenticated, logout }) => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(history.location.pathname);
  }, [history.location.pathname]);

  if (!isAuthenticated) {
    return (
      <nav className="nav-wrapper black darken-2">
        <div className="container">
          <a className="brand-logo">CrypVote</a>
          {isAuthenticated && (
            <ul className="right">
              <li>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav-wrapper black darken-2">
        <div className="container">
          <a className="brand-logo">CrypVote</a>
          <ul className="right">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/newelection">New Election</NavLink>
            </li>
            <li>
              <NavLink to="/elections">Elections</NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
};

export default withRouter(Navbar);
