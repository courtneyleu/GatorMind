import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {collection, query, getDocs} from "firebase/firestore";
import {db} from "../services/firebase";
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
import Button from "react-bootstrap/Button";

const PostList = () => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	// get all the posts in the database and get the data
	const getPosts = async () => {
		try {
			const q = query(collection(db, "post"));
			const doc = await getDocs(q);
			setBlogs(doc.docs);
		} catch (err) {
			console.error(err);
		}
	};

	// with the post information create each card and store them in a list
	const getBlogs = () => {
		let list = [];
		let result = [];
		let i = -1;

		blogs?.map((blogPost) => {
			i++;
			return list.push(
				<MDBCard>
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

						<Link to={`/post/${blogPost.id}`}>Continue reading</Link>
					</MDBCardBody>
				</MDBCard>
			);
		});

		for (let i = 0; i < list.length; i++) {
			result.push(
				<div key={i} className="row mb-2">
					<div>{list[i]}</div>
				</div>
			);
		}

		return result;
	};

	return (
		<div>
			<div className="container mt-3">{getBlogs()}</div>
			<div>
				<button class="refreshBtn" tag="a" onClick={getPosts} size="lg">
					<MDBIcon fas icon="sync" />
				</button>
			</div>
		</div>
	);
};

export default PostList;
