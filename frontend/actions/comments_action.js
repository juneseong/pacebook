import * as CommentApiUtil from "../util/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const removeComment = comment => ({
    type: REMOVE_COMMENT,
    comment
});

export const createComment = (postId, comment) => dispatch =>
    CommentApiUtil.createComment(postId, comment).then(comment => dispatch(receiveComment(comment)));

export const deleteComment = commentId => dispatch =>
    CommentApiUtil.deleteComment(commentId).then(comment => dispatch(removeComment(comment)));