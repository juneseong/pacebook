import * as LikeUtils from "../util/like_api_util";

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like
});

export const removeLike = like => ({
    type: REMOVE_LIKE,
    like
});

export const createLike = like => dispatch => (
    LikeUtils.createLike(like).then(like => dispatch(receiveLike(like)))
);

export const deleteLike = likeId => dispatch => (
    LikeUtils.deleteLike(likeId).then(like => dispatch(removeLike(like)))
);