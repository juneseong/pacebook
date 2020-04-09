import { RECEIVE_USERS_ERRORS } from "../actions/users_action";
import { RECEIVE_CURRENT_USER } from "../actions/session_action";

const _null = [];

const UsersErrorsReducer = (oldState = _null, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_USERS_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return _null;
        default:
            return oldState;
    }
};

export default UsersErrorsReducer;