//get all the posts you need according to whether you are in the
//homepage or are in the 
import {Link} from 'react-router-dom';
const PostList = ({blogs, title})=>{
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map(blog => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}
export default PostList;