import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../services/firebase";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBValidation, MDBValidationItem
} from "mdb-react-ui-kit";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!email || !firstName || !lastName || !username || !password) {
            document.getElementById('form').reset();
            if(!email){
                setEmail("");
            }
            if(!firstName){
                setFirstName("");
            }
            if(!lastName){
                setLastName("");
            }
            if(!username){
                setUsername("");
            }
            if(!password){
                setPassword("");
            }
        }
        else {
            registerWithEmailAndPassword(firstName, lastName, username, email, password);
        }

    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate.replace("/home");
    }, [user, loading]);

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol>
                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-5 text-center">Register</h2>

                            <MDBValidation className="row g-3" id = "form">
                                <MDBRow>
                                    <MDBCol col='6'>
                                        <MDBValidationItem>
                                            <MDBInput
                                                wrapperClass='mb-4'
                                                label='First Name'
                                                id='validationCustom01'
                                                required
                                                type='text'
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </MDBValidationItem>
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBValidationItem>
                                            <MDBInput
                                                wrapperClass='mb-4'
                                                label='Last Name'
                                                id='validationCustom02'
                                                required
                                                type='text'
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </MDBValidationItem>
                                    </MDBCol>
                                </MDBRow>

                                 <MDBValidationItem>
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Username'
                                        id='validationCustom03'
                                        required
                                        type='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </MDBValidationItem>


                                <MDBValidationItem >
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Email'
                                        id='validation04'
                                        type='email'
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem>
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Password'
                                        id='validationCustom05'
                                        required
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </MDBValidationItem>

                                <MDBBtn
                                    className='w-100 mb-4'
                                    size='md'
                                    onClick={register}
                                >
                                    Sign Up
                                </MDBBtn>

                            </MDBValidation>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;