import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginPage = () => {
      const { loginUser } = useContext(AuthContext);

      const handleSubmit = e => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            username.length > 0 && loginUser(username, password);
      };


  return (
    <div className = "color-overlay d-flex justify-content-center align-items-center">
      <Form className={"rounded p-4 p-sm-3"} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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
                  placeholder="Password"
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