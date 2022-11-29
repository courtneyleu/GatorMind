import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import Select from "react-select";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBContainer,
	MDBInput,
	MDBRow,
	MDBTextArea,
	MDBValidation,
} from "mdb-react-ui-kit";
import {
	setDoc,
	doc,
	collection,
	query,
	where,
	updateDoc,
	getDocs,
	arrayUnion,
} from "firebase/firestore";

const options = [
	{ value: "a", label: "a" },
	{ value: "b", label: "b" },
];

function MakeComment() {
	const [user, loading, error] = useAuthState(auth);
	const [body, setBody] = useState("");
	const [created_on, setDate] = useState("");
	const navigate = useNavigate();

	const uid = user.uid;
	const makePost = async () => {
		if (!body) {
			document.getElementById("form").reset();
			if (!body) {
				setBody("");
			}
		} else {
			// add comment to database
			let currentDate = new Date().toJSON().slice(0, 10);
			setDate(currentDate);
			const newComment = doc(collection(db, "comment"));
			const data = {
				uid: uid,
				body: body,
				created_on: created_on,
			};
			await setDoc(newComment, data);

			// TODO: add comment to post -> need the post id
		}
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate("/home");
	}, [user, loading]);

	return (
		<MDBContainer fluid>
			<MDBRow>
				<MDBCol>
					<MDBCard
						className="bg-white my-5 mx-auto"
						style={{ borderRadius: "1rem", maxWidth: "500px" }}
					>
						<MDBCardBody className="p-5 w-100 d-flex flex-column">
							<h2 className="fw-bold mb-5">Comment</h2>

							<MDBValidation
								className="row g-3"
								id="form"
							>
								<MDBTextArea
									wrapperClass="mb-4"
									label="What is on your mind?"
									id="validationCustom03"
									required
									type="text"
									value={body}
									onChange={(e) => setBody(e.target.value)}
								/>

								<MDBBtn
									className="w-100 mb-4"
									size="md"
									onClick={makePost}
								>
									Comment
								</MDBBtn>
							</MDBValidation>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
}

export default MakeComment;
