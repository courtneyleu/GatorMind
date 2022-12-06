import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../services/firebase";
import {Heart} from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "../styles/style.css";
import {
	MDBBtn,
	MDBCardBody,
	MDBIcon,
	MDBCardTitle,
	MDBCard,
	MDBCardSubTitle,
} from "mdb-react-ui-kit";
import "./PostList.css";
import {useAuthState} from "react-firebase-hooks/auth";

const PostList = () => {
	const [user, loading] = useAuthState(auth);
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			return;
		}
		if (user) {
			navigate("/home");
		} else if (user == null) {
			navigate("/");
		}
		getPosts();
	}, [user, loading]);

	// get all the posts in the database and get the data
	const getPosts = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "post"));
			const list = [];
			querySnapshot.forEach((doc) => {
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
			});
			// sorts the data by most recently added
			list.sort((a, b) => {
				return new Date(b.created_on) - new Date(a.created_on);
			});
			setBlogs(list);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<div>
				{blogs?.map((data) => {
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
				<button class="refreshBtn" onClick={getPosts} tag="a" size="lg">
					<MDBIcon fas icon="sync" />
				</button>
			</div>
		</div>
	);
};
export default PostList;
