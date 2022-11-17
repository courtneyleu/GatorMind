import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Default from "./pages/Default"
import Profile from "./pages/Profile";
import Settings from "./pages/Settings"
import {BackspaceReverse, Bell, CircleFill, Gear, HouseDoor} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "./services/firebase"


function App(){
  const [user, loading, error] = useAuthState(auth);
  console.log(useAuthState(auth));

  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            GatorMind
          </Link>
          {user &&
          <div className="navbar-nav ml-auto">
            <li className='nav-item'>
              <button type="button" className="btn btn-dark">
                <Link className='nav-link' to='/home'>
                  <HouseDoor/>
                </Link>
              </button>
            </li>
            <li className='nav-item'>
              <button type="button" className="btn btn-dark">
                <Link className='nav-link' to='/settings'>
                  <Gear/>
                </Link>
              </button>
            </li>
            <li className='nav-item'>
              <button type="button" className="btn btn-dark">
                <Link className='nav-link' to='/notifications'>
                  <Bell/>
                </Link>
              </button>
            </li>
            <li className='nav-item'>
              <button type="button" className="btn btn-dark">
                <Link className='nav-link' to='/profile'>
                  <CircleFill/>
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-dark" onClick={logout}>
                  <Link className = 'nav-link' to='/login'>
                      <BackspaceReverse />
                  </Link>
              </button>
            </li>
          </div>
          }
          {!user &&
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          }
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    );
}

export default App;

