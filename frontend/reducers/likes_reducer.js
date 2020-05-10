import { RECEIVE_LIKE, REMOVE_LIKE } from "../actions/likes_action";
import { RECEIVE_ALL_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/posts_action';

export default function LikesReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LIKE:
            return Object.assign({}, state, { [action.like.id]: action.like });
        case REMOVE_LIKE:
            const newState = Object.assign({}, state);
            delete newState[action.like.id];
            return newState;
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, state, action.likes);
        case RECEIVE_POST:
            return Object.assign({}, state, action.likes);
        case REMOVE_POST:
            const tempState = {};

            Object.entries(state).forEach(([key, like]) => {
                if (like.likeable_id !== action.post.id) {
                    tempState[like.id] = like;
                }
            });

            return tempState;
        default:
            return state;
    }
}