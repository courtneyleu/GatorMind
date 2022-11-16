import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth-service";

import Login from "./pages/LoginPage";
import Register from "./pages/Registration";
import Home from "./pages/Home";
import Default from "./pages/Default"
import Profile from "./pages/Profile";
import Settings from "./pages/Settings"
import {Bell, CircleFill, Gear, HouseDoor} from "react-bootstrap-icons";

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
        this.logOut();
      });
    }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            GatorMind
          </Link>

          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
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
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
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
          )}
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
}

export default App;