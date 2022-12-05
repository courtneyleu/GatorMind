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
} from "mdb-react-ui-kit";
import {
	setDoc,
	doc,
	collection,
	query,
	increment,
	updateDoc,
	getDocs,
	arrayUnion,
	getDoc,
} from "firebase/firestore";
import {Heart, HeartFill} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {fetchUserName} from "./Account";
import * as DOMPurify from "dompurify";
import {MDBTypography} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Post = (props) => {
	const [blog, setBlog] = useState({});
	const [title, setTitle] = useState();
	const [likes, setLikes] = useState();
	const [body, setBody] = useState();
	const [commentBody, setCommentBody] = useState();
	const [liked, setLiked] = useState(false);
	const [createdOn, setCreated] = useState();
	const [user] = useAuthState(auth);
	const [userName, setUserName] = useState();
	const [commentData, setCommentData] = useState();
	const [comments, setComments] = useState([]);
	const [uid, setUID] = useState();
	const [category, setCategory] = useState([]);
	const [commentNum, setCommentNum] = useState();

	const location = useLocation();
	const slug = location.pathname.substring(6);

	useEffect(() => {
		setUID(user.uid);
		getPosts();
		getComments();
	}, [user.uid]);

	const getPosts = async () => {
		try {
			const q = query(collection(db, "post"));
			const doc = await getDocs(q);
			setBlog(doc.docs[slug]);
			setLikes(doc.docs[slug].data().likes);
			setTitle(doc.docs[slug].data().title);
			setBody(doc.docs[slug].data().body);
			setCreated(doc.docs[slug].data().created_on);
			setUserName(doc.docs[slug].data().username);
			setCommentData(doc.docs[slug].data().comment);
			setCategory(doc.docs[slug].data().category);
			setCommentNum(doc.docs[slug].data().commentNum);
		} catch (err) {
			console.error(err);
		}
	};

	const getComments = async () => {
		const list = [];
		for (let i = 0; i < commentNum; i++) {
			const id = commentData[i].id;
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

	const refreshPage = () => {
		window.location.reload(false);
	};

	const makeComment = async (event) => {
		event.preventDefault();
		if (!commentBody) {
			document.getElementById("form").reset();
			if (!commentBody) {
				setBody("");
			}
		} else {
			// add comment to database
			let created_on = new Date().toJSON().slice(0, 10);
			let cUserName = await fetchUserName(user);
			setCreated(createBlog);
			const newComment = doc(collection(db, "comment"));
			const data = {
				body: commentBody,
				created_on: created_on,
				username: cUserName,
				uid: uid,
			};
			await setDoc(newComment, data);

			const blogDoc = doc(db, "post", `${blog.id}`);
			await updateDoc(blogDoc, {
				comment: arrayUnion(newComment),
				commentNum: increment(1),
			});
		}
	};

	const createBlog = () => {
		// protects from cross scripting
		const sanitizer = DOMPurify.sanitize;
		return {__html: sanitizer(body)};
	};

	const postLiked = async () => {
		setLiked(!liked);
		if (!liked) {
			setLikes((likes) => likes + 1);
			const thepost = doc(db, "post", `${blog.id}`);
			// Automatically increment the like by 1
			await updateDoc(thepost, {
				likes: increment(1),
			});
		} else {
			setLikes((likes) => likes - 1);
			const thepost = doc(db, "post", `${blog.id}`);
			await updateDoc(thepost, {
				likes: increment(-1),
			});
		}
	};
	return (
		<MDBCard className="bg-white my-2">
			<MDBCardBody className="p-5 w-100 flex-column">
				<h5
					style={{
						color: "#71797E",
						fontSize: "medium",
					}}
				>
					{userName}
				</h5>
				<h5
					style={{
						color: "#71797E",
						fontSize: "medium",
					}}
				>
					{createdOn}
				</h5>
				<MDBTypography tag="h1">{title}</MDBTypography>
				<div></div>
				<div className="bg-image hover-overlay">
					<Container>
						<Row>
							{category?.map((category) => {
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
				<div className="mt-5 mb-5" dangerouslySetInnerHTML={createBlog()} />
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
								{" " + likes}
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
								{" " + likes}
							</Button>
						);
					}
				})()}

				<MDBCard className="bg-white my-2">
					<MDBCardBody className="p-5 w-100 flex-column">
						<h2 className=" mb-5">Make a Comment</h2>

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
								className="w-100 mb-2"
								size="md"
								type="reset"
								onClick={makeComment}
							>
								Comment
							</MDBBtn>
						</MDBValidation>
					</MDBCardBody>
				</MDBCard>
				<h3>Comments:</h3>
				<div>
					{comments.map((comment) => {
						return (
							<div key={comment.id}>
								<MDBCard>
									<MDBCardBody>
										<p1>{"name: " + comment.username + " "}</p1>
										<p1>{"body: " + comment.text + " "}</p1>
										<p1>{"date: " + comment.date + " "}</p1>
									</MDBCardBody>
								</MDBCard>
							</div>
						);
					})}
				</div>
				<button class="refreshBtn" tag="a" onClick={refreshPage} size="lg">
					<MDBIcon fas icon="sync" />
				</button>
				<p className="lead mb-5">
					<Link to="/home" className="font-weight-bold">
						Back to Posts
					</Link>
				</p>
			</MDBCardBody>
		</MDBCard>
	);
};

export default Post;