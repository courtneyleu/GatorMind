import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import {auth, db} from '../services/firebase'




const getFollowers = async (user) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        let followers = data.followers;
        return (followers);
    }
    catch (err) {
        console.error(err);
    }
}


const fetchUserName = async (user) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        let username = data.username;
        return(username);
    }
    catch (err) {
        console.error(err);
    }
};

const getFollowing = async (user) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        let following = data.following;
        return (following);
    }
    catch (err) {
        console.error(err);
    }
}

const getPosts = async (user) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        let posts = data.posts;
        return (posts);
    }
    catch (err) {
        console.error(err);
    }
}


export {getFollowers, fetchUserName, getFollowing, getPosts};