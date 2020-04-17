import { connect } from "react-redux";
import PostItems from "./post_items";
import { deletePost, updatePost } from "../../../actions/posts_action";
import { createLike, deleteLike } from "../../../actions/likes_action";

const mapStateToProps = (state, ownProps) => {
    const { users, likes } = state.entities;
    return ({
        user: ownProps.post ? users[ownProps.post.user_id] : null,
        users,
        likes
    });
};

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId)),
    updatePost: post => dispatch(updatePost(post)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: like => dispatch(deleteLike(like))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItems);

