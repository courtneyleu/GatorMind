import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios';

const Post = (props) => {
    const [blog, setBlog] = useState({});
    const location = useLocation();
    const slug = location.pathname.substring(6);
    useEffect(() => {

        const fetchData = async () => {
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
            }
            catch (err) {

            }
        };
//title, body , created-on, last-modified (may want to add category section as well)
        fetchData();
    }, []);

    const createBlog = () => {
        return {__html: blog.body}
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
        <div className='container mt-3'>
            <h1 className='display-2'>{blog.title}</h1>
            <h2 className='text-muted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2>
            <h4>{blog.created_on}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/posts' className='font-weight-bold'>Back to Posts</Link></p>
        </div>
    );
};

export default Post;
