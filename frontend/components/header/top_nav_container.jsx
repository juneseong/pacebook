import { connect } from "react-redux";
import TopNav from "./top_nav";
import { logout } from "../../actions/session_action";

const mapStateToProps = (state) => {
    const user = state.entities.users[state.session.id];
    const pendingFriends = [];

    Object.values(state.entities.friendships).forEach(friendship => {
        if (friendship.requestee_id === user.id && !friendship.status) pendingFriends.push(friendship);
    });

    return {
        user,
        pendingFriends
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);