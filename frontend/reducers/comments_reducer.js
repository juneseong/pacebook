import { RECEIVE_COMMENT, DELETE_COMMENT } from "../actions/comments_action";

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENT:

        case DELETE_COMMENT:
        
            return newState;
        default:
            return state;
    }
};