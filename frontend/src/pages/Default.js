import React from "react";
import Button from "react-bootstrap/Button";
import {Stack} from "react-bootstrap";

export default function Default() {
	// the landing page for users -> if logged in will automatically go to the home page
	return (
		<center>
			<div className="p-5 mb-2 rounded-3">
				<div className="container-fluid py-5">
					<h1 className="display-5 fw-bold">Gator Mind</h1>
					<p className="col-md-8 fs-4">A safe space to share</p>
					<Stack gap={2} className="col-md-4 mx-auto">
						<Button href="/login">Login</Button>
						<Button href="/register">Register</Button>
					</Stack>
				</div>
			</div>
		</center>
	);
}
