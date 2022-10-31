import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Nav, Navbar, NavLink, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import{HouseDoor, Bell, Gear, SearchHeart, CircleFill} from "react-bootstrap-icons";

function Trigger(){
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Simple tooltip
        </Tooltip>
    )
}
const Navigationbar = () => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant = "dark" ><SearchHeart /></Button>
            </Form>
                <Nav className = "ms-auto">
                    <Button size = "lg" variant = "none">
                        <NavLink  eventKey="1" as={Link} to="/">
                            <HouseDoor />
                        </NavLink>
                    </Button>
                    <Button size = "lg" variant = "none">
                        <NavLink  eventKey="2" as={Link} to="/notifications">
                            <Bell />
                        </NavLink>
                    </Button>
                    <Button size = "lg" variant = "none">
                        <NavLink  eventKey="3" as={Link} to="/settings">
                            <Gear />
                        </NavLink>
                    </Button>
                    <Button size = "lg" variant = "none">
                        <NavLink  eventKey="4" as={Link} to="/profile">
                            <CircleFill />
                        </NavLink>
                    </Button>
                </Nav>
            </Navbar.Collapse>     
        </Navbar>
    );
}
 
export default Navigationbar;