import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    // make a dummy blog in json format.
    //look into Json.stringify()
    useEffect(() => {
        const fetchData = async () => {
            try {
              //  const res = await axios.get(`http://localhost:8000/api/blog/featured`);
                //make res equal to something else.
                const res = {
                    title: `hello`,
                    body : `hi`,
                    created_on: `11/13/2001`,
                    last_modified: `11/12/2002`
                }
                setFeaturedBlog(res.data[0]);
                console.log(res.data)
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                //const res = await axios.get(`http://localhost:8000/api/post/`);
                const res = [
                   {
                    title: `hot take`,
                    body : `a really hot take`,
                    created_on: `11/13/2001`,
                    last_modified: `11/12/2002`,
                    likes: 0,
                    comments: 100,
                    slug: 0,
                },
            {
                title: `blogged`,
                    body : `reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaallly long`,
                    created_on: `1/1/1970`,
                    last_modified: `11/12/2002`,
                    likes:5,
                    comments: 10,
                    slug: 1,
            }
            ]
                setBlogs(res);
            }
            catch (err) {

            }
        }

        fetchBlogs();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getBlogs = () => {
        let list = [];
        let result = [];
        //"row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        blogs?.map(blogPost => {
            return list.push(
                <div className='row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'
                style = {{width:1200}}>
                    <div className="col p-4 d-flex flex-column position-static">

                        <h3 className="mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.created_on}</div>
                        <p className="card-text mb-auto">{blogPost.body}</p>
                        <p>Likes: {blogPost.likes}    Comments: {blogPost.comments}</p>
                        <Link to={`/posts/${blogPost.slug}`} stuff = {blogPost.slug} className="stretched-link">Continue reading</Link>
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i ++) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                </div>
            )
        }

        return result;
    };

    return (
        <div className='container mt-3'>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to='/category/world'>World</Link>
                    <Link className="p-2 text-muted" to='/category/environment'>Environment</Link>
                    <Link className="p-2 text-muted" to='/category/technology'>Technology</Link>
                    <Link className="p-2 text-muted" to='/category/design'>Design</Link>
                    <Link className="p-2 text-muted" to='/category/culture'>Culture</Link>
                    <Link className="p-2 text-muted" to='/category/business'>Business</Link>
                    <Link className="p-2 text-muted" to='/category/politics'>Politics</Link>
                    <Link className="p-2 text-muted" to='/category/opinion'>Opinion</Link>
                    <Link className="p-2 text-muted" to='/category/science'>Science</Link>
                    <Link className="p-2 text-muted" to='/category/health'>Health</Link>
                    <Link className="p-2 text-muted" to='/category/style'>Style</Link>
                    <Link className="p-2 text-muted" to='/category/travel'>Travel</Link>
                </nav>
            </div>

            

            {getBlogs()}
        </div>
    );
};
/*
Potential featured blog?
<div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{featuredBlog.title}</h1>
                    <p className="lead my-3">{featuredBlog.excerpt}</p>
                    <p className="lead mb-0">
                        <Link to={`/blog/${featuredBlog.slug}`} stuff= {featuredBlog.slug} className="text-white font-weight-bold">
                            Continue reading...
                        </Link>
                    </p>
                </div>
            </div>
            */

export default PostList;