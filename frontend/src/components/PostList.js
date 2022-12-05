import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {collection, query, getDocs} from "firebase/firestore";
import {db} from "../services/firebase";
import {Heart} from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/style.css";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBTextArea,
	MDBValidation,
	MDBContainer,
	MDBCardTitle,
	MDBCardSubTitle,
} from "mdb-react-ui-kit";

const PostList = () => {
	const [blogs, setBlogs] = useState([]);
	const [featuredBlog, setFeaturedBlog] = useState([]);
	//const [liked, setLiked] = useState(false);
	//	const [likes, setLikes] = useState();
	useEffect(() => {
		const getPosts = async (user) => {
			try {
				const q = query(collection(db, "post"));
				const doc = await getDocs(q);
				setBlogs(doc.docs);
				setFeaturedBlog(doc.docs[0].data());
			} catch (err) {
				console.error(err);
			}
		};

		getPosts();
	}, []);

	const getBlogs = () => {
		let list = [];
		let result = [];
		let i = -1;

		blogs?.map((blogPost) => {
			i++;
			return list.push(
				<div
					className="row1 no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
					style={{width: 1200}}
				>
					<MDBCardBody className="p-5 flex-column" width="1000px">
						<MDBCardSubTitle className="mb-1 text-muted">
							{blogPost.data().created_on}
						</MDBCardSubTitle>
						<MDBCardSubTitle className="mb-1 text-muted">
							{blogPost.data().username}
						</MDBCardSubTitle>
						<MDBCardTitle>{blogPost.data().title}</MDBCardTitle>
						<Container>
							<Row>
								{blogPost.data().category.map((category) => {
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
									{" " + blogPost.data().likes}
								</p>
							</div>
							<p>{"Comments: " + blogPost.data().commentNum}</p>
						</div>

						<Link to={`/post/${i}`}>Continue reading</Link>
					</MDBCardBody>
				</div>
			);
		});
		/*className="stretched-link"*/
		for (let i = 0; i < list.length; i++) {
			result.push(
				<div key={i} className="row mb-2">
					<div className="col-md-6">{list[i]}</div>
				</div>
			);
		}

		return result;
	};

	return <div className="container mt-3">{getBlogs()}</div>;
};

export default PostList;
