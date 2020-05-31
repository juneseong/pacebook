import { combineReducers } from "redux";
import UsersReducer from "./users_reducer";
import PostsReducer from "./posts_reducer";
import LikesReducer from "./likes_reducer";
import CommentsReducer from "./comments_reducer";
import FriendshipsReducer from "./friendships_reducer";

const EntitiesReducer = combineReducers({
    users: UsersReducer,
    posts: PostsReducer,
    likes: LikesReducer,
    comments: CommentsReducer,
    friendships: FriendshipsReducer
});

export default EntitiesReducer;