import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth, logInWithEmailAndPassword} from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBValidation,
  MDBValidationItem
} from "mdb-react-ui-kit";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        if (!email || !password) {
            document.getElementById('form').reset();
            if (!email) {
                setEmail("");
            }
            if (!password) {
                setPassword("");
            }
        } else {
            logInWithEmailAndPassword(email, password)
        }
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/home");
        } else if (user == null) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <h2 className="fw-bold mb-2 text-center">Log In</h2>

                            <MDBValidation className="row g-3" id="form">

                                <p className="text-white-50 mb-3"></p>

                                <MDBValidationItem>
                                    <MDBInput
                                        wrapperClass='mb-4 w-100'
                                        label='Email Address'
                                        id='validationCustom01'
                                        type='email'
                                        required
                                        size="lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem>
                                    <MDBInput
                                        wrapperClass='mb-4 w-100'
                                        label='Password'
                                        id='validationCustom02'
                                        required
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        size="lg"
                                    />
                                </MDBValidationItem>

                                <button
                                    className="btn btn-primary"
                                    onClick={login}
                                >
                                    Login
                                </button>

                                <p className="text-white-50 mb-3"></p>
                                <div className="text-center">
                                    Don't have an account? <Link to="/register">Register</Link> now.
                                </div>

                            </MDBValidation>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
export default Login;