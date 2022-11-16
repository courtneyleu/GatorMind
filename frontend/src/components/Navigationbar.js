import {DropdownButton, Form, Image, Nav, Navbar, NavLink} from "react-bootstrap";
import {Bell, CircleFill, Gear, HouseDoor, SearchHeart} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';

import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const NavigationBar = ({logout, isAuthenticated}) => {

const [redirect, setRedirect] = useState(false);

const logout_user = () => {
    logout();
    setRedirect(true);
};

const guestLinks = () => (
    <Fragment>
        <li className='nav-item active'>
            <Link className='nav-link' to='/'>
                Welcome
                <span className='sr-only'>
                    (current)
                </span>
            </Link>
        </li>
        <li className='nav-item'>
            <Link className='nav-link' to='/login'>
                Login
            </Link>
        </li>
        <li className='nav-item'>
            <Link className='nav-link' to='/register'>
                Register
            </Link>
        </li>
    </Fragment>
);

const authLinks = () => (
    <Fragment>
        <li className='nav-item'>
            <button type = "button" class="btn btn-dark">
                <Link className='nav-link' to='/home'>
                    <HouseDoor />
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
                    <Bell />
                </Link>
            </button>
        </li>
        <li className='nav-item'>
            <button type="button" className="btn btn-dark">
                <Link className='nav-link' to='/profile'>
                    <CircleFill />
                </Link>
            </button>
        </li>
    </Fragment>
);
return(
    <Fragment>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link className='navbar-brand' to='/'>Gator Mind</Link>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ml-auto'>
                    {isAuthenticated ? guestLinks() : authLinks()}
                </ul>
            </div>
        </nav>
        {redirect ? <Navigate to='/' /> : <Fragment></Fragment>}
    </Fragment>
);
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);

