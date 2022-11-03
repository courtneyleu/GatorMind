import React, { useState } from "react";
import { TextCenter } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Default() {
  return (
    <center>
      <div>
        <h1>GATOR MIND</h1>
        <h1>A safe space to share.</h1>
      </div>

      <Button>
        <Link to="/Login"></Link>
        Login
      </Button>
      <div></div>

      <Button>
        <Link to="/Register"></Link>
        Create Account
      </Button>
    </center>
  );
}
