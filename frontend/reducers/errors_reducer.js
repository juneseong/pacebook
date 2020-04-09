import { combineReducers } from "redux";
import SessionErrorsReducer from "./session_errors_reducer";
import UsersErrorsReducer from "./users_errors_reducer";

const ErrorsReducer = combineReducers({
    session: SessionErrorsReducer,
    users: UsersErrorsReducer
});

export default ErrorsReducer;