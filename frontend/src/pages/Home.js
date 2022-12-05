import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";

const Home = () => {
	return (
		<div class="wrapper">
			<div>
				<Container>
					<CreatePost />
					<Container fluid>
						<nav>
							<MDBBtn color="light" rippleColor="dark">
								<Link className="p-2 text-black" to="/category/Studying Tips">
									Studying Tips
								</Link>
							</MDBBtn>
							<MDBBtn color="light" rippleColor="dark">
								<Link
									className="p-2 text-black"
									to="/category/College Life Hacks"
								>
									College Life Hacks
								</Link>
							</MDBBtn>

							<MDBBtn color="light" rippleColor="dark">
								<Link className="p-2 text-black" to="/category/Safety Alerts">
									Safety Alerts
								</Link>
							</MDBBtn>

							<MDBBtn color="light" rippleColor="dark">
								<Link
									className="p-2 text-black"
									to="/category/Event Announcements"
								>
									Event Announcements
								</Link>
							</MDBBtn>

							<MDBBtn color="light" rippleColor="dark">
								<Link
									className="p-2 text-black"
									to="/category/Food Recommendations"
								>
									Food Recommendations
								</Link>
							</MDBBtn>

							<MDBBtn color="light" rippleColor="dark">
								<Link className="p-2 text-black" to="/category/Budgeting Tips">
									Budgeting Tips
								</Link>
							</MDBBtn>
						</nav>
					</Container>
					<PostList />
				</Container>
			</div>
		</div>
	);
};

export default Home;
