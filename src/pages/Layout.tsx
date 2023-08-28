import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogOutModal from "../modals/LogOutModal";

const Layout = () => {
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const userEmail = localStorage.getItem("email");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (userEmail && window.location.pathname === "/") {
      navigateTo("");
    }
  }, [navigateTo, userEmail]);

  return (
    <>
      <LogOutModal
        logOutModalOpen={logOutModalOpen}
        setLogOutModalOpen={setLogOutModalOpen}
      />
      <Container maxWidth="xl">
        <AppBar
          position="absolute"
          sx={{
            backgroundColor: "#E2EBFA",
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <Toolbar>
            {userEmail ? (
              <Typography variant="h5" fontWeight="50px" color={"black"} sx={{ flexGrow: 1 }} style={{fontWeight : "bold"}}>
                Welcome {userEmail}
              </Typography>
            ) : (
              <Typography variant="h5"  color={"black"} sx={{ flexGrow: 1 }} style={{fontWeight : "bold"}}>
                You are not logged in
              </Typography>
            )}
            <IconButton>
              <Tooltip title="Go to Home">
                <Link  aria-current="page" to="signUp">
                  <HiHome
                    style={{
                      color: "blue",
                      fontSize: "25px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title="Sign up to App">
                <Link  to="signUp">
                  <FaUserPlus
                    style={{
                      color: "mediumvioletred",
                      fontSize: "25px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  />
                </Link>
              </Tooltip>
            </IconButton>
            {!userEmail && (
              <IconButton>
                <Tooltip title="Log into App">
                  <Link  to="login">
                    <RiLoginCircleLine
                      style={{
                        color: "green",
                        fontSize: "25px",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    />
                  </Link>
                </Tooltip>
              </IconButton>
            )}
            {userEmail && (
              <Tooltip title="Log out from the app">
              <IconButton
                onClick={() => {
                  setLogOutModalOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                  <RiLogoutCircleLine
                    style={{
                      color: "red",
                      fontSize: "25px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  />
              </IconButton>
                </Tooltip>
            )}
          </Toolbar>
        </AppBar>
      </Container>
      <Outlet />
    </>
  );
};

export default Layout;
