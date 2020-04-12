import { RECEIVE_ALL_POSTS, RECEIVE_POST } from '../actions/posts_action';

const PostsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, oldState, action.posts);
        case RECEIVE_POST:
            const newState = { [action.post.id]: action.post };
            return Object.assign({}, oldState, newState);
        default:
            return oldState;
    }
};

export default PostsReducer;