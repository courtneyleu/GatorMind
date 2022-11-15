import { Col, Container, Row, Image } from "react-bootstrap";
import { CircleFill, Gear } from "react-bootstrap-icons";

const Profile = () => {
  return (
    <div className="d-grid gap-md-3">
      <div className="p-3"></div>
      <div className="container">
        <div className="row">
          <div className="col col-sm-4">
            <div className="p-2">
              <div className="row align-items-start">
                <div className="col">
                  <center>
                    <CircleFill size={70} />
                  </center>
                </div>
                <div className="col">
                  <h2>"NAME"</h2>
                </div>
              </div>
              <center>
                <div className="d-grid gap-md-3">
                  <div className="p-1"></div>
                  <div className="row align-items-center">
                    <div className="col">
                      <button className="btn btn-primary">Followers:</button>
                    </div>
                    <div className="col">
                      <button className="btn btn-primary">Following:</button>
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
              <p className="h6">Create Your Own Post...</p>
              <div className="d-grid gap-md-3">
                {/* <div className="p-1">
                                </div> */}
                <div className="p-2 bg-white border">
                  <Row>
                    <Col>Title:</Col>
                    <Col>Tags:</Col>
                  </Row>
                </div>
                <div className="p-2 bg-white border">
                  <p className="h6">What's on your mind?</p>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <button className="btn btn-primary">Post</button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <div className="p-1"></div>

            <div class="btn-group">
              <a href="#" class="btn btn-dark mr-2">
                Recent
              </a>
              <a href="#" class="btn btn-dark">
                Following
              </a>
            </div>

            <div className="p-1"></div>

            <div class="row">
              <div className="p-2 bg-light border">
                <div className="p-2 bg-white border">
                  <left>
                    <CircleFill size={30} />
                  </left>
                  <div className="p-1"></div>

                  <div className="p-1 bg-light border">
                    <p className="h8">Tags:</p>
                  </div>

                  <Row>
                    <Col>
                      <p className="h8">Comments:</p>
                    </Col>
                    <Col>
                      <p className="h8">Reactions:</p>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <div className="p-1"></div>
                      <right>
                        <button className="btn btn-info">Save</button>
                      </right>
                    </Col>
                  </Row>
                </div>

                <div className="p-2"></div>

                <div className="p-2 bg-white border">
                  <left>
                    <CircleFill size={30} />
                  </left>
                  <div className="p-1"></div>

                  <div className="p-1 bg-light border">
                    <p className="h8">Tags:</p>
                  </div>

                  <Row>
                    <Col>
                      <p className="h8">Comments:</p>
                    </Col>
                    <Col>
                      <p className="h8">Reactions:</p>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <div className="p-1"></div>
                      <right>
                        <button className="btn btn-info">Save</button>
                      </right>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
