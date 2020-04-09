import { RECEIVE_CURRENT_USER, LOGOUT_USER } from "../actions/session_action";

const _default = { id: null };

const SessionReducer = (oldState = _default, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            const newState = { id: action.user.id };
            return Object.assign({}, newState);
        case LOGOUT_USER:
            return _default;
        default:
            return oldState;
    }
};

export default SessionReducer;