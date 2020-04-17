import * as LikeUtils from "../util/like_api_util";

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLike = ({ likes }) => ({
    type: RECEIVE_LIKE,
    likes
});

export const removeLike = ({ likes }) => ({
    type: REMOVE_LIKE,
    likes
});

export const createLike = like => dispatch => (
    LikeUtils.createLike(like).then(like => dispatch(receiveLike(like)))
);

export const deleteLike = likeId => dispatch => (
    LikeUtils.deleteLike(likeId).then(like => dispatch(removeLike(like)))
)