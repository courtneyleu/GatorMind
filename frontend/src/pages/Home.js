import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
const Home = () => {
    return (
        <div>
        <h1>Home Page</h1>
        <CreatePost/>
        <PostList/>
        </div>
    );
}
 
export default Home;