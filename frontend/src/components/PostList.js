import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {collection, query, getDocs} from "firebase/firestore";
import {db} from "../services/firebase";
import {Heart} from "react-bootstrap-icons";
import "../styles/style.css"

const PostList = () => {
	const [blogs, setBlogs] = useState([]);
	const [featuredBlog, setFeaturedBlog] = useState([]);
	//const [liked, setLiked] = useState(false);
	//	const [likes, setLikes] = useState();
	useEffect(() => {
		const getPosts = async (user) => {
			try {
				const q = query(collection(db, "post"));
				const doc = await getDocs(q);
				setBlogs(doc.docs);
				setFeaturedBlog(doc.docs[0].data());
			} catch (err) {
				console.error(err);
			}
		};

		getPosts();
	}, []);

	/*	const postLiked = async (props) => {
		setLiked(!liked);
		console.log(liked);
		const btn = document.getElementById("btn");
		if (!liked) {
			setLikes((likes) => likes + 1);
			btn.style.backgroundColor = "blue";
      console.log(props);
       console.log(doc.docs[props]);
          const thepost = doc(db, "post", `${doc.docs[props].id}`);
          

// Atomically increment the population of the city by 50.
     await updateDoc(thepost, {
            likes: increment(1)
                });
		
        } 
    else {
			setLikes((likes) => likes - 1);
			btn.style.backgroundColor = "lightgray";
            
            const thepost = doc(db, "post", `${doc.docs[props].id}`);

            // Atomically increment the population of the city by 50.
                 await updateDoc(thepost, {
                        likes: increment(-1)
                            });


		}

    };
*/
	const getBlogs = () => {
		let list = [];
		let result = [];
		let i = -1;

		blogs?.map((blogPost) => {
			i++;
			if (blogPost.data().comments !== "undefined") {
				console.log("no comments found");
			} else {
				console.log(blogPost.comments.length);
			}

			return list.push(
				<div
					className="row1 no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
					style={{width: 1200}}
				>
					<div className="col p-4 d-flex flex-column position-static">
						<h4 className="mb-0">{blogPost.data().title}</h4>
						<div className="mb-1 text-muted">
							Created On: {blogPost.data().created_on}
						</div>
						<div>Author: {blogPost.data().username}</div>
						<div className="card-text mb-auto" style={{fontSize: 18}}>
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
								<button>
									<Heart />
								</button>{" "}
								{blogPost.data().likes}
							</div>
							<div>Comments:</div>
						</div>

						<Link to={`/post/${i}`}>Continue reading</Link>
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
					<Link className="p-2 text-black" to="/category/Studying Tips">
						Studying Tips
					</Link>
					<Link className="p-2 text-black" to="/category/College Life Hacks">
						College Life Hacks
					</Link>
					<Link className="p-2 text-black" to="/category/Safety Alerts">
						Safety Alerts
					</Link>
					<Link className="p-2 text-black" to="/category/Event Announcements">
						Event Announcements
					</Link>
					<Link className="p-2 text-black" to="/category/Food Recommendations">
						Food Recommendations
					</Link>
					<Link className="p-2 text-black" to="/category/Budgeting Tips">
						Budgeting Tips
					</Link>
				</nav>
			</div>

			{getBlogs()}
		</div>
	);
};

export default PostList;
