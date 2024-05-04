import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Nav = () => {
  const { token, logout, user } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="bg-body-tertiary fw-bold">
        <Container>
          <Link to="/" className=" text-decoration-none text-black fs-3">
            Workout Buddy
          </Link>
          <nav className="d-flex gap-3 align-items-center">
            {user ? <span>{user.email}</span> : null}
            {token ? (
              <Link
                className="text-decoration-none btn-logout"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            ) : (
              <div className="d-flex gap-3 align-items-center">
                <Link className="text-decoration-none text-black" to="/login">
                  Login
                </Link>
                <Link className="text-decoration-none text-black" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
          <Navbar.Toggle />
        </Container>
      </Navbar>
    </div>
  );
};

export default Nav;
