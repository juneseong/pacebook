import { RECEIVE_CURRENT_USER } from "../actions/session_action";
import { RECEIVE_USER } from "../actions/users_action";

const UsersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, oldState, { [action.user.id]: action.user });
        case RECEIVE_USER:
            const newState = Object.assign({}, oldState, { [action.user.id]: action.user });
            return Object.assign({}, oldState, newState);
        default:
            return oldState;
    }
};

export default UsersReducer;