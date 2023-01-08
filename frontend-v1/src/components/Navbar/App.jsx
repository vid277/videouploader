import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserAuth } from "../../context/AuthContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

import logoblack from "../../images/logo-black.png";
import "./styles.css";

function CollapsibleExample() {
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMultiple = (event) => {
    handleClose();
    handleLogout();
  };

  return (
    <Navbar collapseOnSelect bg="clear" variant="light" expand="sm">
      <Navbar.Brand href="#home">
        <img src={logoblack} className="logo-image" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link id="username">{user && user.displayName}</Nav.Link>
          {/* <Avatar src={user && user.photoURL} className="dropdown-toggle" /> */}
          <div>
            <Avatar
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              src={user && user.photoURL}
              onClick={handleClick}
            ></Avatar>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 45 * 4.5,
                  width: "20vh",
                  marginTop: "12px",
                },
              }}
            >
              <MenuItem
                key="Account"
                onClick={handleClose}
                className="menuItem"
                href="/settings"
              >
                <ManageAccountsIcon
                  style={{ color: "var(--font-secondary)" }}
                />
                Account
              </MenuItem>
              <MenuItem
                key="LogoutButton"
                onClick={handleMultiple}
                className="menuItem"
              >
                <LogoutIcon style={{ color: "var(--font-secondary)" }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
