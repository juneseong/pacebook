import React from "react";
import Intro from "./intro";
import Photos from "./photos";
import Friends from "./friends";
import PostForm from "./post_form";
import Posts from "./posts";

export default class Timeline extends React.Component {
    render() {
        const { user, currentUser } = this.props;

        return (
            <div className="profile-page-container">
                <div className="profile-body-left">
                    <Intro user={user} currentUser={currentUser} />
                    <Photos user={user} />
                    <Friends user={user} />
                </div>
                <div className="profile-body-right">
                    <PostForm />
                    <Posts />
                </div>
            </div>
        )
    }
}