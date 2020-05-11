import { connect } from "react-redux";
import PostItems from "./post_items";
import { deletePost, updatePost } from "../../../actions/posts_action";
import { createLike, deleteLike } from "../../../actions/likes_action";
import { createComment, deleteComment } from "../../../actions/comments_action";

const mapStateToProps = (state, ownProps) => {
    const { users, likes, comments } = state.entities;

    let myLike = null, filteredLikes = [], filteredComments = [];

    if (ownProps.post) {
        ownProps.post.like_ids.forEach(id => {
            let like = likes[id];
            if (like && like.likeable_type === "Post") {
                if (like.user_id === ownProps.currentUser.id) myLike = like;
                filteredLikes.push(like);
            }
        });

        ownProps.post.comment_ids.forEach(id => {
            let comment = comments[id];
            if (comment) filteredComments.push(comment);
        });
    }

    return ({
        user: ownProps.post ? users[ownProps.post.user_id] : null,
        like: myLike,
        likes: filteredLikes,
        comments: filteredComments,
        users,
    });
};

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId)),
    updatePost: post => dispatch(updatePost(post)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: like => dispatch(deleteLike(like)),
    createComment: (postId, comment) => dispatch(createComment(postId, comment)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItems);

