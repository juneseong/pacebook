import { connect } from "react-redux";
import CommentItem from "./comment_item";
import { deleteComment } from "../../../actions/comments_action";
import { createLike, deleteLike } from "../../../actions/likes_action";

const mapStateToProps = (state, ownProps) => {
    let myLike = null;

    ownProps.comment.like_ids.forEach(id => {
        let like = state.entities.likes[id];
        if (like && like.user_id === ownProps.currentUser.id) {
            myLike = like;
        }
    });

    return ({
        myLike
    });
};

const mapDispatchToProps = dispatch => ({
    createLike: like => dispatch(createLike(like)),
    deleteLike: like => dispatch(deleteLike(like)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);

