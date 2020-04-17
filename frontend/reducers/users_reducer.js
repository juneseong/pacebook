import { RECEIVE_CURRENT_USER } from "../actions/session_action";
import { RECEIVE_USER, RECEIVE_ALL_USERS } from "../actions/users_action";
import {
  RECEIVE_ALL_POSTS,
  RECEIVE_POST,
  REMOVE_POST,
} from "../actions/posts_action";

const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let user;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      return Object.assign({}, oldState, { [action.user.id]: action.user });
    case RECEIVE_ALL_USERS:
      return Object.assign({}, oldState, action.users);
    case RECEIVE_ALL_POSTS:
      return Object.assign({}, oldState, action.users);
    case RECEIVE_POST:
      user = oldState[action.post.receiver_id];
      user.received_post_ids.unshift(action.post.id);
      return Object.assign({}, oldState, { [action.post.receiver_id]: user });
    case REMOVE_POST:
      const { receiver_id } = action.post;
      user = oldState[receiver_id];
      const targetIndex = user.received_post_ids.indexOf(action.post.id);
      user.received_post_ids.splice(targetIndex, 1);
      return Object.assign({}, oldState, { [receiver_id]: user });
    default:
      return oldState;
  }
};

export default UsersReducer;
