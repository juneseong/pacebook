import { RECEIVE_ALL_POSTS } from '../actions/posts_action';
import { LOGOUT_USER } from '../actions/session_action';
import { REMOVE_FRIEND } from "../actions/friendships_action";
import { RECEIVE_NOTIFICATION } from "../actions/notifications_action";

const NotificationsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;

    switch (action.type) {
        case RECEIVE_NOTIFICATION:
            return Object.assign({}, state, { [action.notification.id]: action.notification });
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, state, action.notifications);
        case REMOVE_FRIEND:
            const friendshipId = action.friendship.id;
            let id;
            newState = Object.assign({}, state);

            Object.values(newState).forEach(notification => {
                if (notification.notifiable_type === "Friendship" && notification.notifiable_id === friendshipId) {
                    id = notification.id;
                }
            });

            delete newState[id];
            return newState;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

export default NotificationsReducer;