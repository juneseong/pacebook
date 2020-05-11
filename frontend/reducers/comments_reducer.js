import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comments_action";
import { RECEIVE_ALL_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/posts_action';
import { REMOVE_LIKE, RECEIVE_LIKE } from '../actions/likes_action';

export default (state = {}, action) => {
    Object.freeze(state);
    let tempState, postId, userId;
    switch (action.type) {
        case RECEIVE_COMMENT:
            return Object.assign({}, state, { [action.comment.id]: action.comment });
        case REMOVE_COMMENT:
            const newState = Object.assign({}, state);
            delete newState[action.comment.comment.id];
            return newState;
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, state, action.comments);
        case RECEIVE_POST:
            return Object.assign({}, state, action.comments);
        case REMOVE_POST:
            tempState = {};

            Object.entries(state).forEach(([key, comment]) => {
                if (comment.post_id !== action.post.id) {
                    tempState[comment.id] = comment;
                }
            });

            return tempState;
        case RECEIVE_LIKE:
            if (action.like.likeable_type === "Comment") {
                tempState = Object.assign({}, state);
                postId = action.like.likeable_id;
                userId = action.like.user_id;
                tempState[postId].like_ids.push(action.like.id);
                return Object.assign({}, state, tempState);
            }
        case REMOVE_LIKE:
            if (action.like.likeable_type === "Comment") {
                tempState = Object.assign({}, state);
                postId = action.like.likeable_id;
                userId = action.like.user_id;
                const targetIdx = tempState[postId].like_ids.indexOf(action.like.id);
                tempState[postId].like_ids.splice(targetIdx, 1);
                return tempState;
            }
        default:
            return state;
    }
};