import { connect } from "react-redux";
import PostItems from "./post_items";
import { deletePost, updatePost } from "../../../actions/posts_action";
import { createLike, deleteLike } from "../../../actions/likes_action";

const mapStateToProps = (state, ownProps) => {
    const { users, likes } = state.entities;

    let myLike = null, filteredLikes = [];

    if (ownProps.post) {
        ownProps.post.like_ids.forEach(id => {
            let like = likes[id];
            if (like) {
                if (like.user_id === ownProps.currentUser.id) {
                    myLike = like;
                }

                filteredLikes.push(like);
            }
        });
    }

    return ({
        user: ownProps.post ? users[ownProps.post.user_id] : null,
        like: myLike,
        likes: filteredLikes,
        users
    });
};

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId)),
    updatePost: post => dispatch(updatePost(post)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: like => dispatch(deleteLike(like))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItems);

