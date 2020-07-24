import { connect } from "react-redux";
import Photos from "./photos";

const mapStateToProps = (state, ownProps) => {
    const photos = [];

    Object.values(state.entities.posts).forEach(post => {
        if (post.img && post.user_id === ownProps.user.id) photos.push(post.img);
    });

    return ({ photos });
};

export default connect(mapStateToProps)(Photos);