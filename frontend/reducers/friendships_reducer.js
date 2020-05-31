import { RECEIVE_FRIEND, REMOVE_FRIEND } from "../actions/friendships_action";
import { RECEIVE_ALL_POSTS } from '../actions/posts_action';

export default function FriendshipsReducer(state = {}, action) {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_FRIEND:
            return Object.assign({}, state, { [action.friendship.id]: action.friendship });
        case REMOVE_FRIEND:
            const newState = Object.assign({}, state);
            delete newState[action.friendship.id];
            return newState;
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, state, action.friendships);
        default:
            return state;
    }
}