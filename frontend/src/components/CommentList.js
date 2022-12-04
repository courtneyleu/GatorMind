import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import fb from "./firebase";

const db = fb.firestore();
const posts = db.collection("posts");

const CommentList = () => {
	const [commentList, setComment] = useState([]);

	useEffect(() => {
		// Subscribe to query with onSnapshot
		const unsubscribe = posts.limit(100).onSnapshot((querySnapshot) => {
			// Get all documents from collection - with IDs
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			// Update state
			setComment(data);
		});

		// Detach listener
		return unsubscribe;
	}, []);

	return (
		<div>
			<h2 className="w-full text-center font-bold text-xl">Comment List</h2>
			{commentList.map((comment) => (
				<div key={comment.id}>
					<p>Title : {comment.Title}</p>
					<p>body: {comment.Body} </p>
				</div>
			))}
			]]
		</div>
	);
};

export default Bloglist;
