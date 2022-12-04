import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {auth, db} from "../services/firebase";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBTextArea,
	MDBValidation,
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
} from "firebase/firestore";
import {Heart} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {fetchUserName} from "./Account";

const Post = (props) => {
	const [blog, setBlog] = useState({});
	const [title, setTitle] = useState();
	const [likes, setLikes] = useState();
	const [body, setBody] = useState();
	const [commentBody, setCommentBody] = useState();
	const [liked, setLiked] = useState(false);
	const [createdOn, setCreated] = useState();
	const [user, loading, error] = useAuthState(auth);
	const [userName, setUserName] = useState();
	const [commentUserName, setCommentUserName] = useState();

	const location = useLocation();
	const slug = location.pathname.substring(6);
	const uid = user.uid;

	useEffect(() => {
		const getPosts = async (user) => {
			try {
				const q = query(collection(db, "post"));
				const doc = await getDocs(q);
				console.log("getting docs now");
				setBlog(doc.docs[slug]);
				setLikes(doc.docs[slug].data().likes);
				setTitle(doc.docs[slug].data().title);
				setBody(doc.docs[slug].data().body);
				setCreated(doc.docs[slug].data().created_on);
				setUserName(doc.docs[slug].data().username);
				console.log(doc.docs[slug]);
				console.log("getting data from docs");
			} catch (err) {
				console.error(err);
			}
		};

		getPosts();
	}, []);

	const makeComment = async () => {
		if (!commentBody) {
			document.getElementById("form").reset();
			if (!commentBody) {
				setBody("");
			}
		} else {
			// add comment to database
			let created_on = new Date().toJSON().slice(0, 10);
			let cUserName = await fetchUserName(user);
			setCommentUserName(cUserName);
			setCreated(createBlog);
			const newComment = doc(collection(db, "comment"));
			const data = {
				body: commentBody,
				created_on: created_on,
				username: cUserName,
			};
			await setDoc(newComment, data);

			const blogDoc = doc(db, "post", `${blog.id}`);
			await updateDoc(blogDoc, {
				comment: arrayUnion(newComment),
			});
		}
	};

	const createBlog = () => {
		return {__html: body};
	};

	const postLiked = async () => {
		setLiked(!liked);
		console.log(liked);
		const btn = document.getElementById("btn");
		if (!liked) {
			setLikes((likes) => likes + 1);
			btn.style.backgroundColor = "blue";
			console.log(blog.id);
			const thepost = doc(db, "post", `${blog.id}`);

			// Atomically increment the population of the city by 50.
			await updateDoc(thepost, {
				likes: increment(1),
			});
		} else {
			setLikes((likes) => likes - 1);
			btn.style.backgroundColor = "lightgray";

			const thepost = doc(db, "post", `${blog.id}`);

			// Atomically increment the population of the city by 50.
			await updateDoc(thepost, {
				likes: increment(-1),
			});
		}
	};
	return (
		<div className="container mt-3">
			<h1 className="display-2">{title}</h1>
			<h2 className="text-muted mt-3">Category:</h2>
			<h3>{"Author: " + userName}</h3>
			<h4>{createdOn}</h4>
			<div className="mt-5 mb-5" dangerouslySetInnerHTML={createBlog()} />
			<div
				style={{
					display: "flex",
					columnGap: 60,
					alignItems: "center",
					fontWeight: "bold",
				}}
			>
				<button onClick={postLiked}>
					<Heart />
					{" " + likes}
				</button>
				<div>Comments:</div>
			</div>
			<MDBCard className="bg-white my-2">
				<MDBCardBody className="p-5 w-100 flex-column">
					<h2 className=" mb-5">Comment</h2>

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

						<MDBBtn className="w-100 mb-2" size="md" onClick={makeComment}>
							Comment
						</MDBBtn>
					</MDBValidation>
				</MDBCardBody>
			</MDBCard>
			<hr />
			<p className="lead mb-5">
				<Link to="/home" className="font-weight-bold">
					Back to Posts
				</Link>
			</p>
		</div>
	);
};

export default Post;
