import * as PostApiUtil from "../util/post_api_util";

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";

const receiveAllPosts = posts => ({
    type: RECEIVE_ALL_POSTS,
    posts
});

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const createPost = post => dispatch => (
    PostApiUtil.createPost(post)
        .then(post => dispatch(receivePost(post)))
);

export const fetchPosts = () => dispatch => (
    PostApiUtil.fetchPosts()
        .then(posts => dispatch(receiveAllPosts(posts)))
);

export const fetchPost = postId => dispatch => (
    PostApiUtil.fetchPost(postId)
        .then(post => dispatch(receivePost(post)))
);