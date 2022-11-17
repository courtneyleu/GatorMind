import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../services/firebase";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdb-react-ui-kit";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!email) alert("Please enter email");
        registerWithEmailAndPassword(firstName, lastName, username, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate.replace("/home");
    }, [user, loading]);

    return (
        <MDBContainer fluid>
             <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                    <h2 className="fw-bold mb-5">Register</h2>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='First name'
                                id='form1'
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Last name'
                                id='form1'
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBInput
                        wrapperClass='mb-4'
                        label='Email'
                        id='form1'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                  <MDBInput
                        wrapperClass='mb-4'
                        label='Username'
                        id='form1'
                        type='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />


                    <MDBInput
                        wrapperClass='mb-4'
                        label='Password'
                        id='form1'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <MDBBtn
                        className='w-100 mb-4'
                        size='md'
                        onClick={register}
                    >
                        Sign Up
                    </MDBBtn>

                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default Register;