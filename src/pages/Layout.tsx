import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
//import React from 'react';
import { useState,useEffect } from "react";
import LogOutModal from "../modals/LogOutModal";
const Layout = () => {
  const [logOutModalOpen,setLogOutModalOpen] = useState(false)
  const userEmail = localStorage.getItem("email");
  const navigateTo = useNavigate()
  useEffect(()=>{
    //window.location.pathname === "/" checks that if we enter the routes manually it doesnt auto navigate to the todos and it only navigates to todos if the url is empty of routes (or the default route) . 
    if(userEmail && window.location.pathname === "/"){
      navigateTo("")
    }
  },[navigateTo,userEmail])

  return (
    <>
      <LogOutModal logOutModalOpen={logOutModalOpen} setLogOutModalOpen={setLogOutModalOpen} />
      <div className="container-fluid">
        {/* Navigation */}
        <nav
          className="navbar navbar-expand-lg static-top rounded-bottom-4"
          style={{ backgroundColor: "#E2EBFA" }}
        >
          <div className="container">
            {userEmail ? (
              <h3 className="navbar-brand">
                Welcome {userEmail}
              </h3>
            ) : (
              <h3>you are not logged in</h3>
            )}
            <div>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    title="go to signUp page"
                    className="nav-link"
                    aria-current="page"
                    to="signUp"
                  >
                    <HiHome
                      style={{
                        color: "blue",
                        fontSize: "25px",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link title="Sign up to App" className="nav-link" to="signUp">
                    <FaUserPlus
                      style={{
                        color: "mediumvioletred",
                        fontSize: "25px",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    />
                  </Link>
                </li>
                {!userEmail && (
                  <li className="nav-item">
                    <Link title="Log into App" className="nav-link" to="login">
                      <RiLoginCircleLine
                        style={{
                          color: "green",
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                )}
                {userEmail && (
                  <li
                    title="logOut from the app"
                    className="nav-item nav-link  text-danger"
                    onClick={() => {
                      setLogOutModalOpen(true)//setLogOutOpen(true);
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
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
