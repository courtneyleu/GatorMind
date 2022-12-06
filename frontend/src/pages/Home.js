import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";



const Home = () => {
	return (
		<div class="wrapper">
			<div>
				<Container>
					<CreatePost />
					<Container fluid>
						<Row>
							<Col>
								<MDBBtn color="light" rippleColor="dark">
									<Link className="p-2 text-black text-center" to="/category/Studying Tips">
										Studying Tips
									</Link>
								</MDBBtn>
							</Col>
							<Col>
								<MDBBtn color="light" rippleColor="dark">
									<Link
										className="p-2 text-black text-center"
										to="/category/College Life Hacks"
									>
										College Life Hacks
									</Link>
								</MDBBtn>
							</Col>
							<Col>
								<MDBBtn color="light" rippleColor="dark">
									<Link className="p-2 text-black text-center" to="/category/Safety Alerts">
										Safety Alerts
									</Link>
								</MDBBtn>
							</Col>
							<Col>
								<MDBBtn color="light" rippleColor="dark">
									<Link
										className="p-2 text-black text-center"
										to="/category/Event Announcements"
									>
										Event Announcements
									</Link>
								</MDBBtn>
							</Col>
							<Col>
								<MDBBtn color="light" rippleColor="dark">
									<Link
										className="p-2 text-black text-center"
										to="/category/Food Recommendations"
									>
										Food Recommendations
									</Link>

								</MDBBtn>
							</Col>
							<Col>
								<MDBBtn color="light" rippleColor="dark">
									<Link
										className="p-2 text-black text-center"
										to="/category/Budgeting Tips"
									>
										Budgeting Tips
									</Link>
								</MDBBtn>
							</Col>
						</Row>
					</Container>
					<PostList />
				</Container>
			</div>
		</div>
	);
};

export default Home;

