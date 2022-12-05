import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import {Link} from "react-router-dom";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBTextArea,
	MDBValidation,
} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";
import "./Home.css";
const Home = () => {
	return (
		<div class="wrapper">
			<div class="sidenav">
				<nav>
					<div class="inner">
						<MDBBtn color="light" rippleColor="dark">
							<Link className="p-2 text-black" to="/category/Studying Tips">
								Studying Tips
							</Link>
						</MDBBtn>
					</div>
					<div class="inner">
						<MDBBtn color="light" rippleColor="dark">
							<Link
								className="p-2 text-black"
								to="/category/College Life Hacks"
							>
								College Life Hacks
							</Link>
						</MDBBtn>
					</div>
					<div class="inner">
						<MDBBtn color="light" rippleColor="dark">
							<Link className="p-2 text-black" to="/category/Safety Alerts">
								Safety Alerts
							</Link>
						</MDBBtn>
					</div>
					<div class="inner">
						<MDBBtn color="light" rippleColor="dark">
							<Link
								className="p-2 text-black"
								to="/category/Event Announcements"
							>
								Event Announcements
							</Link>
						</MDBBtn>
					</div>
					<div class="inner">
						<MDBBtn color="light" rippleColor="dark">
							<Link
								className="p-2 text-black"
								to="/category/Food Recommendations"
							>
								Food Recommendations
							</Link>
						</MDBBtn>
					</div>
					<div class="inner">
						<MDBBtn color="light" rippleColor="dark">
							<Link className="p-2 text-black" to="/category/Budgeting Tips">
								Budgeting Tips
							</Link>
						</MDBBtn>
					</div>
				</nav>
			</div>
			<div class="posts">
				<Container>
					<CreatePost />
					<PostList />
				</Container>
			</div>
		</div>
	);
};

export default Home;
