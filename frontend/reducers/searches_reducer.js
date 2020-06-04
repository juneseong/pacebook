import { RECEIVE_SEARCH_USERS } from '../actions/users_action';

const SearchReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_SEARCH_USERS:
            return Object.assign({}, action.users);
        default:
            return state;
    }
};

export default SearchReducer;