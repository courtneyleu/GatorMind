import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
	collectionGroup,
} from "firebase/firestore";
import {auth, db} from "../services/firebase";

// gets the user's first name
const fetchFirstName = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let following = data.firstName;
		return following;
	} catch (err) {
		console.error(err);
	}
};

// gets the user's last name
const fetchLastName = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let following = data.lastName;
		return following;
	} catch (err) {
		console.error(err);
	}
};

// gets the user's following number
const getFollowers = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let followers = data.followers;
		return followers;
	} catch (err) {
		console.error(err);
	}
};

// gets the user's username
const fetchUserName = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let username = data.username;
		return username;
	} catch (err) {
		console.error(err);
	}
};

// gets the user's following number
const getFollowing = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let following = data.following;
		return following;
	} catch (err) {
		console.error(err);
	}
};

// gets how many posts the user has made
const getPostsLength = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let posts = data.posts.length;
		return posts;
	} catch (err) {
		console.error(err);
	}
};

// gets the actual post from the user
const getPosts = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let posts = data.posts;
		return posts;
	} catch (err) {
		console.error(err);
	}
};

// gets the email of the user
const getEmail = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		let posts = data.email;
		return posts;
	} catch (err) {
		console.error(err);
	}
};

// get the user like
const getUserLikes = async (user) => {
	try {
		// get the users document
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const documentSnap = await getDocs(q);
		const data = documentSnap.docs[0].data();
		// use the posts array to get the post documents
		let posts = data.posts;
		let likes = 0;
		// cycle through posts to add likes
		for (let i = 0; i < posts.length; i++) {
			const postDoc = await getDoc(posts[i]);
			const postData = postDoc.data();
			if (postData.likes == null) {
				continue;
			}
			likes += postData.likes;
		}
		return likes;
	} catch (err) {
		console.error(err);
	}
};

const getUserComments = async (user) => {
	try {
		// get the users document
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const documentSnap = await getDocs(q);
		const data = documentSnap.docs[0].data();
		// use the posts array to get the post documents
		let posts = data.posts;
		let comments = 0;
		// cycle through posts to add likes
		for (let i = 0; i < posts.length; i++) {
			const postDoc = await getDoc(posts[i]);
			const postData = postDoc.data();
			if (postData.comments == null) {
				continue;
			}
			comments += postData.comments.length;
		}
		return comments;
	} catch (err) {
		console.error(err);
	}
};

export {
	getFollowers,
	fetchUserName,
	getFollowing,
	getPosts,
	getPostsLength,
	fetchLastName,
	fetchFirstName,
	getEmail,
	getUserLikes,
	getUserComments,
};
