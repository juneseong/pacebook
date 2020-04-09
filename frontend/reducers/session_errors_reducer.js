import { RECEIVE_SESSION_ERRORS } from "../actions/session_action";
import { RECEIVE_CURRENT_USER } from "../actions/session_action";

const _null = [];

const SessionErrorsReducer = (oldState = _null, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return _null;
        default:
            return oldState;
    }
};

export default SessionErrorsReducer;