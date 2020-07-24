import { connect } from "react-redux";
import Photos from "./photos";

const mapStateToProps = (state, ownProps) => {
    const photos = [];

    if (ownProps.user && ownProps.user.id) {
        state.entities.users[ownProps.user.id].received_post_ids.forEach(postId => {
            const post = state.entities.posts[postId];
            if (post && post.img && post.user_id === ownProps.user.id) photos.push(post.img);
        });
    }

    return ({ photos });
};

export default connect(mapStateToProps)(Photos);