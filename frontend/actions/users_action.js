import * as UserApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_action";

export const RECEIVE_USERS_ERRORS = "RECEIVE_USERS_ERRORS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_SEARCH_USERS = "RECEIVE_SEARCH_USERS";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
});

const receiveUsersErrors = errors => ({
    type: RECEIVE_USERS_ERRORS,
    errors
});

const receiveSearchUsers = users => ({
    type: RECEIVE_SEARCH_USERS,
    users
});

export const fetchUser = userId => dispatch => (
    UserApiUtil.fetchUser(userId)
        .then(user => dispatch(receiveUser(user)))
);

export const fetchUsers = postIds => dispatch => (
    UserApiUtil.fetchUsers(postIds)
        .then(users => dispatch(receiveAllUsers(users)))
);

export const createUser = user => dispatch => (
    UserApiUtil.createUser(user)
        .then(user => dispatch(receiveCurrentUser(user)),
            errors => dispatch(receiveUsersErrors(errors.responseJSON)))
);

export const updateUser = (userId, formData) => dispatch => (
    UserApiUtil.updateUser(userId, formData)
        .then(user => dispatch(receiveUser(user)))
);

export const fetchSearchUsers = data => dispatch => (
    UserApiUtil.fetchSearchUsers(data)
        .then(users => dispatch(receiveSearchUsers(users)))
);