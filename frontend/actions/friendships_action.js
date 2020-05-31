import * as FriendshipUtils from "../util/friendship_api_util";

export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const REMOVE_FRIEND = "REMOVE_FRIEND";

const receiveFriendship = friendship => ({
    type: RECEIVE_FRIEND,
    friendship
});

const removeFriendship = friendship => ({
    type: REMOVE_FRIEND,
    friendship
});

export const addFriend = requesteeId => dispatch => (
    FriendshipUtils.addFriend(requesteeId).then(friendship => dispatch(receiveFriendship(friendship)))
);

export const acceptFriend = requesteeId => dispatch => (
    FriendshipUtils.acceptFriend(requesteeId).then(friendship => dispatch(receiveFriendship(friendship)))
);

export const deleteFriend = requesteeId => dispatch => (
    FriendshipUtils.deleteFriend(requesteeId).then(friendship => dispatch(removeFriendship(friendship)))
);