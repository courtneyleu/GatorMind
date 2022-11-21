import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = (props) => {
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${'http://localhost:8000'}/api/post/${slug}`);
                setBlog(res.data);
            }
            catch (err) {

            }
        };
//title, body , created-on, last-modified (may want to add category section as well)
        fetchData();
    }, [props.match.params.id]);

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
            <p className='lead mb-5'><Link to='/post' className='font-weight-bold'>Back to Posts</Link></p>
        </div>
    );
};

export default Post;
