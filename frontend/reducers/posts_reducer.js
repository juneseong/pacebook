import { RECEIVE_ALL_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/posts_action';

const PostsReducer = (oldState = { post_ids: [] }, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            const posts = action.posts;
            posts.post_ids = action.post_ids;
            return Object.assign({}, oldState, posts);
        case RECEIVE_POST:
            const newState = Object.assign({}, oldState, { [action.post.id]: action.post });
            newState.post_ids.unshift(action.post.id);
            return newState;
        case REMOVE_POST:
            const nextState = Object.assign({}, oldState);
            delete nextState[action.post.id];
            return nextState;
        default:
            return oldState;
    }
};

export default PostsReducer;