import React, {Component, useState} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Default from "./pages/Default";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import {
	BackspaceReverse,
	Bell,
	CircleFill,
	Gear,
	HouseDoor,
} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "./services/firebase";
import {MDBIcon} from "mdb-react-ui-kit";
import PostList from "./components/PostList";
import Post from "./components/Post";
function App() {
	const [user, loading, error] = useAuthState(auth);
	const [search, SetSearch] = useState("");
	const [blogs, setBlogs] = useState([]);
	console.log(useAuthState(auth));

	const SearchBlog = (e) => {
		e.preventDefault();
		setBlogs(
			blogs.filter(
				(blogs) =>
					blogs.data().title.toLowerCase().includes(search.toLowerCase()) ||
					blogs.data().body.toLowerCase().includes(search.toLowerCase())
			)
		);
	};
	return (
		<div>
			{user && (
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<a className="navbar-brand" href="#">
						<MDBIcon fas icon="brain" />
						GatorMind
					</a>
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<form
								onSubmit={(e) => {
									SearchBlog();
								}}
							>
								<input
									onChange={(e) => {
										SetSearch(e.target.value);
									}}
								/>
								<button type="submit">Search</button>
							</form>
						</li>
						<li className="nav-item">
							<button type="button" className="btn btn-dark">
								<Link className="nav-link" to="/home">
									<HouseDoor />
								</Link>
							</button>
						</li>
						<li className="nav-item">
							<button type="button" className="btn btn-dark">
								<Link className="nav-link" to="/settings">
									<Gear />
								</Link>
							</button>
						</li>
						<li className="nav-item">
							<button type="button" className="btn btn-dark">
								<Link className="nav-link" to="/profile">
									<CircleFill />
								</Link>
							</button>
						</li>
						<li className="nav-item">
							<button type="button" className="btn btn-dark" onClick={logout}>
								<Link className="nav-link" to="/login">
									<BackspaceReverse />
								</Link>
							</button>
						</li>
					</div>
				</nav>
			)}

			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<Default />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/posts" element={<PostList />} />
					<Route path="/post/:id" element={<Post />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
