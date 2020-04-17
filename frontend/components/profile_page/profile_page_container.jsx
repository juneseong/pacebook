import { connect } from "react-redux";
import ProfilePage from "./profile_page";
import { updateUser } from "../../actions/users_action";
import { fetchPosts } from "../../actions/posts_action"; 

const mapStateToProps = (state, ownProps) => {
    const user = state.entities.users[ownProps.match.params.userId];
    
    return { 
        user: user ? user : {},
        currentUser: state.entities.users[state.session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, formData) => dispatch(updateUser(userId, formData)).fetchPosts,
    fetchPosts: userId => dispatch(fetchPosts(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);