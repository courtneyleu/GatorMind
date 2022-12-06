import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {auth, db} from "../services/firebase";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBTextArea,
	MDBValidation,
	MDBIcon,
	MDBCardSubTitle,
	MDBCardText,
} from "mdb-react-ui-kit";
import {
	setDoc,
	doc,
	collection,
	increment,
	updateDoc,
	arrayUnion,
	getDoc,
} from "firebase/firestore";
import {Chat, Heart, HeartFill} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {fetchUserName} from "./Account";
import {MDBTypography} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Post = () => {
	const [likes, setLikes] = useState();
	const [commentBody, setCommentBody] = useState();
	const [liked, setLiked] = useState(false);
	const [user] = useAuthState(auth);
	const [comments, setComments] = useState([]);
	const [uid, setUID] = useState();
	const [post, setPost] = useState({});
	const [id, setID] = useState();

	// handles what loads when the page loads
	useEffect(() => {
		setUID(user.uid);
		getPosts();
		getComments();
	}, [user.uid]);

	// get the post information using the ID in the url
	const getPosts = async () => {
		let text = window.location.href;
		const myArray = text.split("/");
		let id = myArray[4];
		setID(id);
		try {
			const docRef = doc(db, "post", `${id}`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const docData = docSnap.data();
				const data = {
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
				setPost(data);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (err) {
			console.error(err);
		}
	};

	// once we have the post data -> need to get the comments
	const getComments = async () => {
		const list = [];
		for (let i = 0; i < post.commentNum; i++) {
			const id = post.comment[i].id;
			const docRef = doc(db, "comment", `${id}`);
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();

			const body = {
				text: data.body,
				date: data.created_on,
				username: data.username,
			};

			list.push(body);
		}
		setComments(list);
	};

	// submits the comment information and adds it to the comment model and the post model in the database
	const makeComment = async (event) => {
		event.preventDefault();
		if (!commentBody) {
			document.getElementById("form").reset();
			if (!commentBody) {
				setCommentBody("");
			}
		} else {
			// add comment to database
			let created_on = new Date().toJSON().slice(0, 10);
			let cUserName = await fetchUserName(user);
			const newComment = doc(collection(db, "comment"));
			const data = {
				body: commentBody,
				created_on: created_on,
				username: cUserName,
				uid: uid,
			};
			await setDoc(newComment, data);

			const blogDoc = doc(db, "post", `${id}`);
			await updateDoc(blogDoc, {
				comment: arrayUnion(newComment),
				commentNum: increment(1),
			});
		}
	};

	// controls the number of likes a person can make (1 per post)
	const postLiked = async () => {
		setLiked(!liked);
		if (!liked) {
			setLikes((post.likes = post.likes + 1));
			const thepost = doc(db, "post", `${id}`);
			// Automatically increment the like by 1
			await updateDoc(thepost, {
				likes: increment(1),
			});
		} else {
			setLikes((post.likes = post.likes - 1));
			const thepost = doc(db, "post", `${id}`);
			await updateDoc(thepost, {
				likes: increment(-1),
			});
		}
	};
	return (
		<div>
			<MDBCard className="bg-white my-2">
				<MDBCardBody className="p-5 w-100 flex-column">
					<h5
						style={{
							color: "#71797E",
							fontSize: "medium",
						}}
					>
						{post.username}
					</h5>
					<h5
						style={{
							color: "#71797E",
							fontSize: "medium",
						}}
					>
						{post.created_on}
					</h5>
					<MDBTypography tag="h1">{post.title}</MDBTypography>
					<div></div>
					<div className="bg-image hover-overlay">
						<Container>
							<Row>
								{post.category?.map((category) => {
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
					</div>
					<MDBCardSubTitle style={{color: "white"}}>Hello</MDBCardSubTitle>
					<MDBCardText>{post.body}</MDBCardText>
					{(() => {
						if (!liked) {
							return (
								<Button
									type="button"
									style={{
										color: "#00005c",
										backgroundColor: "#FFFFFF",
										borderColor: "#FFFFFF",
										boxShadow: "none",
									}}
									onClick={postLiked}
								>
									<Heart />
									{" " + post.likes}
								</Button>
							);
						} else {
							return (
								<Button
									type="button"
									style={{
										color: "#00005c",
										backgroundColor: "#FFFFFF",
										borderColor: "#FFFFFF",
										boxShadow: "none",
									}}
									onClick={postLiked}
								>
									<HeartFill />
									{" " + post.likes}
								</Button>
							);
						}
					})()}
					<Button
						style={{
							color: "#00005c",
							backgroundColor: "#FFFFFF",
							borderColor: "#FFFFFF",
							boxShadow: "none",
						}}
					>
						<Chat />
						{" " + post.commentNum}
					</Button>
					<h3>Comments:</h3>
					<MDBCard className="bg-white my-2">
						<MDBCardBody className="p-5 w-100 flex-column">
							<MDBValidation className="row g-3" id="form">
								<MDBTextArea
									wrapperClass="mb-2"
									label="Comment"
									id="validationCustom03"
									required
									type="text"
									value={commentBody}
									onChange={(e) => setCommentBody(e.target.value)}
								/>

								<MDBBtn
									style={{
										borderColor: "#FFFFFF",
										boxShadow: "none",
										width: "150px",
									}}
									size="md"
									type="reset"
									onClick={makeComment}
								>
									Comment
								</MDBBtn>
							</MDBValidation>
						</MDBCardBody>
					</MDBCard>
					<div>
						{comments.map((comment) => {
							return (
								<div key={comment.id}>
									<MDBCard>
										<MDBCardBody>
											<MDBCardSubTitle
												style={{
													color: "#71797E",
													fontSize: "medium",
												}}
											>
												{comment.username}
											</MDBCardSubTitle>
											<MDBCardSubTitle
												style={{
													color: "#71797E",
													fontSize: "medium",
												}}
											>
												{comment.date}
											</MDBCardSubTitle>
											<MDBCardBody>{comment.text}</MDBCardBody>
										</MDBCardBody>
									</MDBCard>
								</div>
							);
						})}
					</div>
					<p className="lead mb-5">
						<Link to="/home" className="font-weight-bold">
							Back to Posts
						</Link>
					</p>
				</MDBCardBody>
			</MDBCard>
			<div>
				<button class="refreshBtn" onClick={getComments} tag="a" size="lg">
					<MDBIcon fas icon="sync" />
				</button>
			</div>
		</div>
	);
};

export default Post;
