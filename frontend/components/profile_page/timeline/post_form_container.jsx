import { connect } from "react-redux";
import PostForm from "./post_form";
import { createPost } from "../../../actions/posts_action";

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
    post: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);