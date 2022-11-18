import {CircleFill, Gear} from "react-bootstrap-icons";

const Settings = () => {
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
                                    <h2>"NAME"</h2>
                                </div>
                            </div>
                            <center>
                                <div className='d-grid gap-md-3'>
                                    <div className="p-1">
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <button className="btn btn-primary">
                                                Followers:
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-primary">
                                                Following:
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary">
                                        <Gear />
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
