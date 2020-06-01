import { connect } from "react-redux";
import Friends from "./friends";

const mapStateToProps = (state, ownProps) => {
    const userFriendIds = [];
    const ourFriends = {};

    if (ownProps.currentUser) {
        const myFriendshipIds = state.entities.users[ownProps.currentUser.id].requests_received_ids.concat(state.entities.users[ownProps.currentUser.id].requests_sent_ids);
    
        ownProps.friends.forEach(friend => {
            userFriendIds.push(friend.id);
        });

        myFriendshipIds.forEach(id => {
            const friendship = state.entities.friendships[id];

            if (friendship) {
                if (friendship.requester_id === ownProps.currentUser.id) {
                    if (userFriendIds.includes(friendship.requestee_id)) {
                        if (friendship.status) {
                            ourFriends[friendship.requestee_id] = "friend";
                        } else {
                            ourFriends[friendship.requestee_id] = "sent";
                        }
                    }
                }

                if (friendship.requestee_id === ownProps.currentUser.id) {
                    if (userFriendIds.includes(friendship.requester_id)) {
                        if (friendship.status) {
                            ourFriends[friendship.requester_id] = "friend";
                        } else {
                            ourFriends[friendship.requester_id] = "received";
                        }
                    }
                }
            }
        });
    }

    return {
        ourFriends
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);