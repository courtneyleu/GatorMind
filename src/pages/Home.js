import PostList from "../components/PostList";
import useAxios from "../utils/useAxios";
const Home = () => {
    const {blogs, isPending, error} = useAxios('http://localhost:8000/blogs');
    return (
        <div>
        <h1>Home Page</h1>
       <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <PostList blogs={blogs} title="All Blogs"/>
        </div>
        </div>
    );
}
 
export default Home;