import {useContext} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginPage = () => {
  return (
    <div className = "color-overlay d-flex justify-content-center align-items-center">
      <Form className={"rounded p-4 p-sm-3"}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="email"
              placeholder="Enter Email"
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required />
          </Form.Group>

          <Button>
            Login
          </Button>
      </Form>
      </div>
  );
};

export default LoginPage;