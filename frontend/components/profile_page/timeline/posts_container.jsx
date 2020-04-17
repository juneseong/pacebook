import { connect } from "react-redux";
import Posts from "./posts";

const mapStateToProps = (state, ownProps) => {
  const { currentUser } = ownProps;
  const { users, posts } = state.entities;
  const receivedPosts = ownProps.user.id ? users[ownProps.user.id].received_post_ids.map((id) => posts[id]) : [];

	return {
    currentUser,
    users,
    posts: receivedPosts,
  };
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
