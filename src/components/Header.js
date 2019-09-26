import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="fixed-top">
      <Link to="/profile">
        <img
          src="https://i.postimg.cc/4dqXTtCn/avatar.jpg"
          alt="avatar"
          className="avatar"
        />
      </Link>

      <div className="app-name">
        <Link to="/">ortoo.app</Link>
      </div>

      <Link to="/signin">
        <i className="fas fa-camera" />
      </Link>
    </header>
  );
};

export default Header;
