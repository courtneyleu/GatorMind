import {CircleFill, Gear, People} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth} from "../services/firebase";
import {Link, useNavigate} from "react-router-dom";
import {
	fetchUserName,
	getFollowers,
	fetchFirstName,
	fetchLastName,
	getFollowing,
	getEmail,
	getPostsLength,
	getUserLikes,
	getUserComments,
} from "../components/Account";

function Settings() {
	const [user, loading] = useAuthState(auth);
	const [name, setName] = useState("");
	const [followers, setFollowers] = useState(0);
	const [fname, setFirstName] = useState("");
	const [lname, setLastName] = useState("");
	const [following, setFollowing] = useState("");
	const [email, setEmail] = useState("");
	const [numPosts, setNumPosts] = useState(0);
	const [likes, setLikes] = useState(0);
	const [numComments, setComments] = useState(0);
	const navigate = useNavigate();

	// gets all the user information
	useEffect(() => {
		let promiseNumPosts = getPostsLength(user);
		promiseNumPosts.then(
			function (value) {
				setNumPosts(value);
			},
			function (error) {
				setNumPosts("error");
			}
		);

		let promiseEmail = getEmail(user);
		promiseEmail.then(
			function (value) {
				setEmail(value);
			},
			function (error) {
				setEmail("error");
			}
		);

		let promiseName = fetchUserName(user);
		promiseName.then(
			function (value) {
				setName(value);
			},
			function (error) {
				setName("error");
			}
		);

		let promiseFirstName = fetchFirstName(user);
		promiseFirstName.then(
			function (value) {
				setFirstName(value);
			},
			function (error) {
				setFirstName("error");
			}
		);
		let promiseLastName = fetchLastName(user);
		promiseLastName.then(
			function (value) {
				setLastName(value);
			},
			function (error) {
				setLastName("error");
			}
		);

		let promiseFollowing = getFollowers(user);
		promiseFollowing.then(
			function (value) {
				setFollowers(value);
			},
			function (error) {
				setFollowers("error");
			}
		);

		let promiseFollowers = getFollowing(user);
		promiseFollowers.then(
			function (value) {
				setFollowing(value);
			},
			function (error) {
				setFollowing("error");
			}
		);

		let promiseLikes = getUserLikes(user);
		promiseLikes.then(
			function (value) {
				setLikes(value);
			},
			function (error) {
				setLikes("error");
			}
		);

		let promiseComments = getUserComments(user);
		promiseComments.then(
			function (value) {
				setComments(value);
			},
			function (error) {
				setComments("error");
			}
		);

		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);

	return (
		<div className="d-grid gap-md-3">
			<div className="p-3"></div>
			<div className="container">
				<div className="row">
					<div className="col col-sm-4">
						<div className="p-2">
							<div className="row align-items-start">
								<div className="col">
									<center>
										<CircleFill size={70} />
									</center>
								</div>
								<div className="col">
									<h2>{"" + name}</h2>
								</div>
							</div>
							<center>
								<div className="d-grid gap-md-3">
									<div className="p-1"></div>
									<div className="row align-items-center">
										<div className="col">
											<button className="btn btn-primary">
												{"Followers: " + followers}
											</button>
										</div>
										<div className="col">
											<button className="btn btn-primary">
												{"Following: " + following}
											</button>
										</div>
									</div>
									<button className="btn btn-primary">
										<Link className="nav-link" to="/profile">
											<People />
											{" Profile"}
										</Link>
									</button>
									<p className="lead">{"Total Posts: " + numPosts} </p>
									<p className="lead">{"Total Likes: " + likes} </p>
									<p className="lead">{"Total Comments: " + numComments}</p>
								</div>
							</center>
						</div>
					</div>

					<div className="col">
						<div className="p-2 bg-light border">
							<p className="h2">Settings</p>
							<div className="d-grid gap-md-3">
								<div className="p-1"></div>
								<div className="p-2 bg-white border">
									<p className="h5">Account Information</p>
									<div className="row">
										<div className="col">
											<p className="h7">{"Email:         " + email}</p>
										</div>
										<div className="col">
											<p className="h7">{"Name: " + fname + " " + lname}</p>
										</div>
									</div>
								</div>
								<div className="p-2 bg-white border">
									<p className="h5">Other Settings</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
