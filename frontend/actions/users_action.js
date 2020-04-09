import * as UserApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_action";

export const RECEIVE_USERS_ERRORS = "RECEIVE_USERS_ERRORS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUsersErrors = errors => ({
    type: RECEIVE_USERS_ERRORS,
    errors
});

export const fetchUser = userId => dispatch => (
    UserApiUtil.fetchUser(userId)
        .then(user => dispatch(receiveUser(user)))
);

export const createUser = user => dispatch => (
    UserApiUtil.createUser(user)
        .then(user => dispatch(receiveCurrentUser(user)),
            errors => dispatch(receiveUsersErrors(errors.responseJSON)))
);

export const updateUser = user => dispatch => (
    UserApiUtil.updateUser(user)
        .then(user => dispatch(receiveCurrentUser(user)))
);