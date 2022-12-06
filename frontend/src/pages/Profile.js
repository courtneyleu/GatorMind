import {Col, Row} from "react-bootstrap";
import {CircleFill, Gear, Heart} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
	fetchUserName,
	getFollowers,
	getFollowing,
	getPosts,
	getPostsLength,
	getUserLikes,
	getUserComments,
} from "../components/Account";
import {auth} from "../services/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import CreatePost from "../components/CreatePost";
import {getDoc} from "firebase/firestore";
import {
	MDBBtn,
	MDBIcon,
	MDBCard,
	MDBCardBody,
	MDBCardSubTitle,
	MDBCardTitle,
} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";

const Profile = () => {
	const [user, loading] = useAuthState(auth);
	const [name, setName] = useState("");
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);
	const [postData, setPostData] = useState([]);
	const [likes, setLikes] = useState(0);
	const [numComments, setComments] = useState(0);
	const [postList, setPostList] = useState([]);
	const navigate = useNavigate();

	// get all the information from the account component and load all the user's posts
	useEffect(() => {
		let promiseName = fetchUserName(user);
		promiseName.then(function (value) {
			setName(value);
		});
		let promiseFollowing = getFollowers(user);
		promiseFollowing.then(function (value) {
			setFollowers(value);
		});

		let promiseTotalPosts = getPostsLength(user);
		promiseTotalPosts.then(function (value) {
			setTotalPosts(value);
		});

		let promiseFollowers = getFollowing(user);
		promiseFollowers.then(function (value) {
			setFollowing(value);
		});

		let promiseLikes = getUserLikes(user);
		promiseLikes.then(function (value) {
			setLikes(value);
		});

		let promiseComments = getUserComments(user);
		promiseComments.then(function (value) {
			setComments(value);
		});

		let promisePosts = getPosts(user);
		promisePosts.then(function (value) {
			setPostData(value);
		});

		posts();
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);

	const posts = async () => {
		const list = [];
		for (let i = 0; i < postData.length; i++) {
			const doc = await getDoc(postData[i]);
			const docData = doc.data();
			const data = {
				id: doc.id,
				body: docData.body,
				category: docData.category,
				comment: docData.comment,
				commentNum: docData.commentNum,
				created_on: docData.created_on,
				likes: docData.likes,
				title: docData.title,
				uid: docData.uid,
				username: docData.username,
			};
			list.push(data);
		}
		list.sort((a, b) => {
			return new Date(b.created_on) - new Date(a.created_on);
		});
		setPostList(list);
	};

	console.log(postList);

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
									<button className="btn btn-secondary">
										<Link className="nav-link" to="/settings">
											<Gear />
											{" Settings"}
										</Link>
									</button>
									<p className="lead">{"Total Posts: " + totalPosts} </p>
									<p className="lead">{"Total Likes: " + likes} </p>
									<p className="lead">{"Total Comments: " + numComments}</p>
								</div>
							</center>
						</div>
					</div>
					<div className="col">
						<CreatePost />
					</div>
					<div>
						{postList?.map((data) => {
							return (
								<div>
									<MDBCard className="mt-4">
										<MDBCardBody className="p-5 flex-column">
											<MDBCardSubTitle className="mb-1 text-muted">
												{data.created_on}
											</MDBCardSubTitle>
											<MDBCardSubTitle className="mb-1 text-muted">
												{data.username}
											</MDBCardSubTitle>
											<MDBCardTitle>{data.title}</MDBCardTitle>
											<Container>
												<Row>
													{data.category.map((category) => {
														return (
															<Col md="auto">
																<MDBBtn color="light" rippleColor="dark">
																	{category.value}
																</MDBBtn>
															</Col>
														);
													})}
												</Row>
											</Container>
											<p></p>
											<div
												style={{
													display: "flex",
													columnGap: 60,
													alignItems: "center",
													fontSize: "medium",
												}}
											>
												<div>
													<p
														type="button"
														style={{
															color: "#00005c",
															backgroundColor: "#FFFFFF",
															borderColor: "#FFFFFF",
															boxShadow: "none",
														}}
													>
														<Heart />
														{" " + data.likes}
													</p>
												</div>
												<p>{"Comments: " + data.commentNum}</p>
											</div>
											<Link to={`/post/${data.id}`}>Continue reading</Link>
										</MDBCardBody>
									</MDBCard>
								</div>
							);
						})}
					</div>
					<div>
						<button class="refreshBtn" onClick={posts} tag="a" size="lg">
							<MDBIcon fas icon="sync" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
