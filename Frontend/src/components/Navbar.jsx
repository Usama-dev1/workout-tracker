import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/authHook";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

    const handleDoubleClick = (e) => {
      e.preventDefault();
    };
  return (
    <header>
      <div className="container">
        <Link onClick={handleDoubleClick} to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <nav>
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
