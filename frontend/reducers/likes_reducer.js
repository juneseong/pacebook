import { RECEIVE_LIKE, REMOVE_LIKE } from "../actions/likes_action";
import { RECEIVE_ALL_POSTS } from '../actions/posts_action';

export default function LikesReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LIKE:
            return Object.assign({}, state, action.likes);
        case REMOVE_LIKE:
            const newState = Object.assign({}, state);
            delete newState[Object.values(action.likes)[0].id];
            return newState;
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, state, action.likes);
        default:
            return state;
    }
}