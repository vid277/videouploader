import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import Container from "react-bootstrap/Container";

import Footer from "../../components/Footer/App";
import Navbar from "../../components/Navbar/App";

import "./styles.css";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="encapsulating-screen-div">
      <Navbar />
      <div className="center-screen-account">
        <h1 className="page-main-header">Account</h1>
        <p>User Email: {user && user.email}</p>

        <button onClick={handleLogout} className="border px-6 py-2 my-4">
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
