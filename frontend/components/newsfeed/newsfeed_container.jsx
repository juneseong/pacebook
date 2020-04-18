import { connect } from "react-redux";
import Newsfeed from "./newsfeed";
import { fetchAllPosts } from "../../actions/posts_action"; 

const mapStateToProps = ({entities: {newsfeed, users, posts}, session}) => {
    const filteredPosts = posts.post_ids.map(id => posts[id]);

    return {
        currentUser: users[session.id],
        posts: filteredPosts
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);