import { connect } from "react-redux";
import TopNav from "./top_nav";
import { logout } from "../../actions/session_action";
import { fetchSearchUsers } from "../../actions/users_action";
import { readNotification } from "../../actions/notifications_action";
import { acceptFriend, deleteFriend } from "../../actions/friendships_action"; 

const mapStateToProps = (state) => {
    const user = state.entities.users[state.session.id];
    const pendingFriends = [];
    const newFriendRequests = [];
    const notifications = [];
    let unreadRequestsCount = 0;
    let unreadNotificationsCount = 0;

    Object.values(state.entities.notifications).reverse().forEach(notification => {
        if (notification.type === "Friendship") {
            const friendship = state.entities.friendships[notification.notifiable_id];
            if (friendship && friendship.requestee_id === user.id && !friendship.status) {
                pendingFriends.push(friendship);
                if (!notification.read) {
                    newFriendRequests.push(notification);
                    unreadRequestsCount ++;
                }
            }
        } else {
            notifications.push(notification);
            if (!notification.read) unreadNotificationsCount ++;
        }
    });

    return {
        user,
        pendingFriends,
        newFriendRequests,
        notifications,
        users: state.entities.search.users ? state.entities.search.users : {},
        unreadRequestsCount,
        unreadNotificationsCount
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    searchUsers: data => dispatch(fetchSearchUsers(data)),
    readNotification: id => dispatch(readNotification(id)),
    acceptFriend: friendship => dispatch(acceptFriend(friendship)),
    deleteFriend: friendship => dispatch(deleteFriend(friendship))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);