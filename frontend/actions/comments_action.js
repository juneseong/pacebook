// import * as PostApiUtil from "../util/post_api_util";

// export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
// export const DELETE_COMMENT = "DELETE_COMMENT";

// const receiveComment = ({ posts, users, comments }) => ({
//     type: RECEIVE_ALL_POSTS,
//     posts,
//     users,
//     comments
// });

// const receivePost = (post) => ({
//     type: RECEIVE_POST,
//     post,
// });

// const removePost = ({ post }) => ({
//     type: REMOVE_POST,
//     post
// });

// export const createPost = (userId, formData) => (dispatch) =>
//     PostApiUtil.createPost(userId, formData).then((post) => {
//         return dispatch(receivePost(post));
//     });

// export const fetchPosts = userId => (dispatch) =>
//     PostApiUtil.fetchPosts(userId).then(posts => dispatch(receiveAllPosts(posts)));

// export const fetchAllPosts = () => (dispatch) =>
//     PostApiUtil.fetchAllPosts().then(posts => dispatch(receiveAllPosts(posts)));

// export const fetchPost = (postId) => (dispatch) =>
//     PostApiUtil.fetchPost(postId).then((post) => dispatch(receivePost(post)));

// export const deletePost = postId => dispatch =>
//     PostApiUtil.deletePost(postId).then(post => dispatch(removePost(post)));

// export const updatePost = post => dispatch => (
//     PostApiUtil.updatePost(post).then(post => dispatch(receivePost(post)))
// );