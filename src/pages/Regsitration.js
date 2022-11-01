import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isValid, setValid] = useState(false);
    const { registerUser } = useContext(AuthContext);

    function passwordCheck(){
        if(password === password2){
            setValid(true);
        }
        else{
            setValid(false);
        }
    }

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
      <div className = "color-overlay d-flex justify-content-center align-items-center">
      <Form className={"rounded p-4 p-sm-3"} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="email"
              placeholder="Enter Email"
              onChange={e => setEmail(e.target.value)}
              type="text"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                  type="password"
                  id="password"
                  onChange={e => setPassword2(e.target.value)}
                  placeholder="Confirm Password"
                  required />
          </Form.Group>

          <Button onClick = {passwordCheck}>
            Submit
          </Button>
      </Form>
      </div>
  );
}

export default Register;