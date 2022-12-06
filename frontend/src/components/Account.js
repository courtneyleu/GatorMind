import {collection, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../services/firebase";

// gets the user's first name
const fetchFirstName = async (user) => {
	try {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		return data.firstName;
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
		return data.lastName;
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
		return data.followers;
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
		return data.username;
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
		return data.following;
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
		return data.posts.length;
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
		return data.posts;
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
		return data.email;
	} catch (err) {
		console.error(err);
	}
};

// get the user likes the user has recieved on their posts
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
		for (const post of posts) {
			const postDoc = await getDoc(post);
			const postData = postDoc.data();
			if (postData.likes == 0) {
				like += 0;
			}
			likes += postData.likes;
		}
		return likes;
	} catch (err) {
		console.error(err);
	}
};

// get the number of comments the user has recieved on the posts
const getUserComments = async (user) => {
	try {
		// get the users document
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const documentSnap = await getDocs(q);
		const data = documentSnap.docs[0].data();
		// use the posts array to get the post documents
		let posts = data.posts;
		let comments = 0;
		// cycle through posts to add number of comments
		for (const post of posts) {
			const postDoc = await getDoc(post);
			const postData = postDoc.data();
			if (postData.commentNum == null) {
				continue;
			} else {
				comments += postData.commentNum;
			}
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
