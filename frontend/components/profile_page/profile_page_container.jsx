import { connect } from "react-redux";
import ProfilePage from "./profile_page";
import { fetchUser, updateUser } from "../../actions/users_action";

const mapStateToProps = (state, ownProps) => {
    const user = state.entities.users[ownProps.match.params.userId];
    
    return { 
        user: user ? user : {},
        currentUser: state.entities.users[state.session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    updateUser: (userId, formData) => dispatch(updateUser(userId, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);