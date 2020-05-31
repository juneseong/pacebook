import { connect } from "react-redux";
import ProfilePage from "./profile_page";
import { updateUser } from "../../actions/users_action";
import { fetchPosts } from "../../actions/posts_action"; 
import { addFriend, acceptFriend, deleteFriend } from "../../actions/friendships_action"; 

const mapStateToProps = (state, ownProps) => {
    let user = state.entities.users[ownProps.match.params.userId];
    user = user ? user : {};
    const currentUser = state.entities.users[state.session.id];

    let requestReceived = null;
    let requestSent = null;

    if (currentUser) {
        const request_sent_ids = currentUser.requests_sent_ids ? currentUser.requests_sent_ids : [];
        const request_received_ids = currentUser.requests_received_ids ? currentUser.requests_received_ids : [];

        request_sent_ids.forEach(id => {
            const friendship = state.entities.friendships[id];
            if (friendship && friendship.requestee_id === user.id) requestSent = friendship;
        });

        request_received_ids.forEach(id => {
            const friendship = state.entities.friendships[id];
            if (friendship && friendship.requester_id === user.id) requestReceived = friendship;
        });
    }

    const friends = [];

    Object.values(state.entities.friendships).forEach(friendship => {
        if ((friendship.requestee_id === user.id && friendship.status) || (friendship.requester_id === user.id && friendship.status)) {
            const friend = friendship.requestee_id === user.id ? "requester" : "requestee";
            const friendId = friendship[`${friend}_id`];
            const friendName = friendship[`${friend}_name`];
            const friendImg = friendship[`${friend}_img`];

            friends.push({id: friendId, name: friendName, image: friendImg});
        }
    });

    return { 
        user,
        currentUser,
        requestReceived,
        requestSent,
        friends
    };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, formData) => dispatch(updateUser(userId, formData)).fetchPosts,
    fetchPosts: userId => dispatch(fetchPosts(userId)),
    addFriend: friendship => dispatch(addFriend(friendship)),
    acceptFriend: friendship => dispatch(acceptFriend(friendship)),
    deleteFriend: friendship => dispatch(deleteFriend(friendship)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);