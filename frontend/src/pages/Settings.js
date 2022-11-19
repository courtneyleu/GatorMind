import {CircleFill, Gear} from "react-bootstrap-icons";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import { auth, db, logout } from "../services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {fetchUserName, getFollowers} from '../components/Account'



function Settings() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [followers, setFollowers] = useState(0);
    const navigate = useNavigate();

    let promiseName = fetchUserName(user);
    promiseName.then(
        function(value) {setName(value);},
        function(error) {setName("error");}
    );

    let promiseFollowing = getFollowers(user);
    promiseFollowing.then(
        function(value) {setFollowers(value);},
        function(error) {setName("error");}
    );

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);

    return (
        <div className="d-grid gap-md-3">
            <div className="p-3">
            </div>
            <div className="container">
                <div className="row">

                    <div className="col col-sm-4">
                        <div className="p-2">
                            <div className="row align-items-start">
                                <div className="col">
                                    <center>
                                        <CircleFill size={70}/>
                                    </center>
                                </div>
                                <div className="col">
                                    <div>{"" + name}</div>
                                </div>
                            </div>
                            <center>
                                <div className='d-grid gap-md-3'>
                                    <div className="p-1">
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <button className="btn btn-primary">
                                                <div>{"Followers: " + followers}</div>
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-primary">
                                                Following:
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary">
                                        <Gear/>
                                        Settings
                                    </button>
                                    <p className="lead">Total Posts: </p>
                                    <p className="lead">Total Likes: </p>
                                    <p className="lead">Total Comments: </p>
                                </div>
                            </center>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-2 bg-light border">
                            <p className="h2">Settings</p>
                            <div className="d-grid gap-md-3">
                                <div className="p-1">
                                </div>
                                <div className="p-2 bg-white border">
                                    <p className="h5">Account Information</p>
                                    <div className="row">
                                        <div className="col">
                                            <p className="h7">Email:</p>
                                        </div>
                                        <div className="col">
                                            <p className="h7">Name:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-white border">
                                    <p className="h5">Other Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
