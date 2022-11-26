import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios';
import {collection, query, getDocs} from "firebase/firestore";
import { db} from '../services/firebase'

const Post = (props) => {
    const [blog, setBlog] = useState({});
    const [title, setTitle] = useState();
    const [likes, setLikes] = useState();
    const [body, setBody] = useState();
    const [liked, setLiked] = useState(false);
    const [createdOn, setCreated] = useState();
    const location = useLocation();
    const slug = location.pathname.substring(6);
   console.log(slug);
   /* useEffect(() => {

        const getPost = async (user) => {
            try {
                const q = query(collection(db, "post"));
                const doc = await getDocs(q);
                console.log("getting docs now");
                console.log(doc);
                setBlog(doc.docs[0]);
                console.log(blog.data());
                setLikes(doc.docs[slug].likes);
                const data = doc.docs[3].data();
                console.log("getting data from docs");
                console.log(data);

               return data;
            }
            catch (err) {
                console.error(err);
            }
        }

      /*  const fetchData = async () => {
            try {
               // const res = await axios.get(`${'http://localhost:8000'}/api/post/${slug}`);
               const res = [
               {
                title: `hello`,
                body : `hi`,
                created_on: `11/13/2001`,
                last_modified: `11/12/2002`,
                slug: 12,
                likes: 50,
                comments: 100,
            }
            ,
            { 
            title: `hello`,
            body : `hi`,
            created_on: `11/13/2001`,
            last_modified: `11/12/2002`,
            likes: 1,
            comments: 4
        }
        ]
                setBlog(res[slug]);
                setLikes(res[slug].likes);
            }
            catch (err) {

            }
        };
//title, body , created-on, last-modified (may want to add category section as well)
       //fetchData();
       getPost();
    }, []);*/
    useEffect(() => {

        const getPosts = async (user) => {
            try {
                const q = query(collection(db, "post"));
                const doc = await getDocs(q);
                console.log("getting docs now");
                setBlog(doc.docs[slug]);
                setLikes(doc.docs[slug].data().likes);
                setTitle(doc.docs[slug].data().title);
                setBody(doc.docs[slug].data().body);
                setCreated(doc.docs[slug].data().created_on);
                console.log(createdOn);
                console.log("getting data from docs");
            }
            catch (err) {
                console.error(err);
            }
        }

        getPosts();
    }, []);


    const createBlog = () => {
        return {__html: body}
    };

    const postLiked = ()=>{
        setLiked(!liked);
        console.log(liked);
        const btn = document.getElementById('btn');
        if(!liked){
        setLikes((likes)=> likes+1);
        console.log(likes);
        btn.style.backgroundColor = 'blue';
        }
        else{
            setLikes((likes)=>likes-1);
            btn.style.backgroundColor = 'lightgray';
        }
    }
    return (
        <div className='container mt-3'>
            <h1 className='display-2'>{title}</h1>
            <h2 className='text-muted mt-3'>Category:</h2>
            <h4>{createdOn}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <div style={{display: 'flex',columnGap:60, alignItems: 'center', fontWeight: 'bold'}}>
                            <button id = 'btn' onClick = {postLiked}> <img src = "https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699070_960_720.png"
                            width="25" height= "25" />Likes: {likes}</button>   
                        <div>Comments:</div>
            </div>
            <hr />
            <p className='lead mb-5'><Link to='/posts' className='font-weight-bold'>Back to Posts</Link></p>
        </div>
    );
};

export default Post;
