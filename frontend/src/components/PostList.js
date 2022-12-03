import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 	doc,
  increment,
updateDoc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
const PostList = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState();
  useEffect(() => {
    const getPosts = async (user) => {
      try {
        const q = query(collection(db, "post"));
        const doc = await getDocs(q);
        console.log("getting docs now");
        console.log(doc);
        setBlogs(doc.docs);
        setFeaturedBlog(doc.docs[0].data());
        const data = doc.docs[0].data();
        console.log("getting data from docs");
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();
  }, []);


	const postLiked = async () => {
		setLiked(!liked);
		console.log(liked);
		const btn = document.getElementById("btn");
		if (!liked) {
			setLikes((likes) => likes + 1);
			btn.style.backgroundColor = "blue";
            console.log(blog.id);
          const thepost = doc(db, "post", `${blog.id}`);
          

// Atomically increment the population of the city by 50.
     await updateDoc(thepost, {
            likes: increment(1)
                });
		
        } 
    else {
			setLikes((likes) => likes - 1);
			btn.style.backgroundColor = "lightgray";
            
            const thepost = doc(db, "post", `${blog.id}`);

            // Atomically increment the population of the city by 50.
                 await updateDoc(thepost, {
                        likes: increment(-1)
                            });


		}

    };

  const getBlogs = () => {
    let list = [];
    let result = [];
    let i = -1;

    blogs?.map((blogPost) => {
      i++;
      return list.push(
        <div
          className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          style={{ width: 1200 }}
        >
          <div className="col p-4 d-flex flex-column position-static">
            <h3 className="mb-0">{blogPost.data().title}</h3>
            <div className="mb-1 text-muted">
              Created On: {blogPost.data().created_on}
            </div>
            <div className="card-text mb-auto" style={{ fontSize: 18 }}>
              {blogPost.data().body}
            </div>
            <div
              style={{
                display: "flex",
                columnGap: 60,
                alignItems: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              <div>
                <button className="btn btn-danger" onClick = {postLiked} size="sm">
                  like{" "}
                </button>{" "}
                {blogPost.data().likes}
              </div>
              <div>Comments:</div>
            </div>

            <Link to={`/post/${i}`} >
              Continue reading
            </Link>
          </div>
        </div>
      );
    });
/*className="stretched-link"*/
    for (let i = 0; i < list.length; i++) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{list[i]}</div>
        </div>
      );
    }

    return result;
  };

  return (
    <div className="container mt-3">
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 text-muted" to="/category/world">
            World
          </Link>
          <Link className="p-2 text-muted" to="/category/environment">
            Environment
          </Link>
          <Link className="p-2 text-muted" to="/category/technology">
            Technology
          </Link>
          <Link className="p-2 text-muted" to="/category/design">
            Design
          </Link>
          <Link className="p-2 text-muted" to="/category/culture">
            Culture
          </Link>
          <Link className="p-2 text-muted" to="/category/business">
            Business
          </Link>
          <Link className="p-2 text-muted" to="/category/politics">
            Politics
          </Link>
          <Link className="p-2 text-muted" to="/category/opinion">
            Opinion
          </Link>
          <Link className="p-2 text-muted" to="/category/science">
            Science
          </Link>
          <Link className="p-2 text-muted" to="/category/health">
            Health
          </Link>
          <Link className="p-2 text-muted" to="/category/style">
            Style
          </Link>
          <Link className="p-2 text-muted" to="/category/travel">
            Travel
          </Link>
        </nav>
      </div>

      <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">{featuredBlog.title}</h1>
          <p className="lead mb-0">
            <Link
              to={`/post/${featuredBlog.slug}`}
              className="text-white font-weight-bold"
            >
              Continue reading...
            </Link>
          </p>
        </div>
      </div>

      {getBlogs()}
    </div>
  );
};

export default PostList;
