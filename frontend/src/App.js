import React, {useState, useEffect} from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Default from "./pages/Default";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import {
	BackspaceReverse,
	CircleFill,
	Gear,
	HouseDoor,
} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./services/firebase";
import {MDBIcon} from "mdb-react-ui-kit";
import PostList from "./components/PostList";
import Post from "./components/Post";
import {signOut} from "firebase/auth";

function App() {
	const [user, loading] = useAuthState(auth);
	const [search, SetSearch] = useState("");
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();

	// prototype search bar
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

	// allows the user to log off the website
	const logout = () => {
		signOut(auth);
	};

	// if the user is already signed in will redirect them to the home page
	useEffect(() => {
		if (loading) {
			return;
		}
		if (user) {
			navigate("/home");
		} else if (user == null) {
			return;
		}
	}, [user, loading]);

	return (
		<div>
			{user && (
				<nav
					className="navbar navbar-expand navbar-dark bg-dark"
					style={{position: "sticky", top: "0px", zIndex: "1020"}}
				>
					<a className="navbar-brand" href="/home">
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
								<Link className="nav-link" to="/">
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
