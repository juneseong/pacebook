import { connect } from "react-redux";
import TopNav from "./top_nav";
import { logout } from "../../actions/session_action";
import { fetchSearchUsers } from "../../actions/users_action";

const mapStateToProps = (state) => {
    const user = state.entities.users[state.session.id];
    const pendingFriends = [];

    Object.values(state.entities.friendships).forEach(friendship => {
        if (friendship.requestee_id === user.id && !friendship.status) pendingFriends.push(friendship);
    });

    return {
        user,
        pendingFriends,
        users: state.entities.search.users ? state.entities.search.users : {}
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    searchUsers: data => dispatch(fetchSearchUsers(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);