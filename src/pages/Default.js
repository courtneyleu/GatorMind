import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Default() {
  return (
    <div>
      <h1>Default Page</h1>
      <h1>GATOR MIND</h1>
      <h1>A safe space to share.</h1>

      <button>
        <ul>
          <li>
            <Link to="/Login">Log In</Link>
          </li>
          <li>
            <Link to="/Register">Create Account</Link>
          </li>
        </ul>
      </button>
    </div>
  );
}
