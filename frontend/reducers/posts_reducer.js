import { RECEIVE_ALL_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/posts_action';
import { REMOVE_LIKE, RECEIVE_LIKE } from '../actions/likes_action';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comments_action";

const PostsReducer = (oldState = { post_ids: [] }, action) => {
    Object.freeze(oldState);

    let tempState, postId, userId, targetIdx;
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            const posts = Object.assign({}, oldState, action.posts);
            posts.post_ids = action.post_ids;
            return Object.assign({}, oldState, posts);
        case RECEIVE_POST:
            const newState = Object.assign({}, oldState, { [action.post.id]: action.post });
            newState.post_ids.unshift(action.post.id);
            return newState;
        case REMOVE_POST:
            const nextState = Object.assign({}, oldState);
            targetIdx = nextState.post_ids.indexOf(action.post.id);
            nextState.post_ids.splice(targetIdx, 1);
            delete nextState[action.post.id];
            return nextState;
        case RECEIVE_LIKE:
            if (action.like.likeable_type === "Post") {
                tempState = Object.assign({}, oldState);
                postId = action.like.likeable_id;
                userId = action.like.user_id;
                tempState[postId].like_ids.push(action.like.id);
                return Object.assign({}, oldState, tempState);
            }
        case REMOVE_LIKE:
            if (action.like.likeable_type === "Post") {
                tempState = Object.assign({}, oldState);
                postId = action.like.likeable_id;
                userId = action.like.user_id;
                targetIdx = tempState[postId].like_ids.indexOf(action.like.id);
                tempState[postId].like_ids.splice(targetIdx, 1);
                return tempState;
            }
        case RECEIVE_COMMENT:
            if (action.type === "RECEIVE_COMMENT") {
                tempState = Object.assign({}, oldState);
                postId = action.comment.post_id;
                userId = action.comment.user_id;
                tempState[postId].comment_ids.push(action.comment.id);
                return Object.assign({}, oldState, tempState);
            }
        case REMOVE_COMMENT:
            if (action.type === "REMOVE_COMMENT") {
                tempState = Object.assign({}, oldState);
                postId = action.comment.comment.post_id;
                userId = action.comment.comment.user_id;
                targetIdx = tempState[postId].comment_ids.indexOf(action.comment.id);
                tempState[postId].comment_ids.splice(targetIdx, 1);
                return tempState;
            }
        default:
            return oldState;
    }
};

export default PostsReducer;