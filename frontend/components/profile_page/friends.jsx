import React from "react";
import { Link } from "react-router-dom";

export default class Friends extends React.Component {
    renderFriendsButton(friendId) {
        if (!this.props.currentUser) {
            return (<></>);
        } else if (!this.props.ourFriends[friendId]) {
            if (friendId !== this.props.currentUser.id) {
                return (
                    <button className="friends-add-friend-btn"><i className="fas fa-user-plus"></i> Add Friend</button>
                )
            } else {
                return (<></>);
            }
        } else {
            if (this.props.ourFriends[friendId] === "friend") {
                return (
                    <button><i className="fas fa-check"></i> Friends</button>
                )
            } else if (this.props.ourFriends[friendId] === "sent") {
                return (
                    <button><i className="fas fa-user-check"></i> Friend Request Sent</button>
                )
            } else if (this.props.ourFriends[friendId] === "received") {
                return (
                    <button> <i className="fas fa-user-plus"></i> Respond to Friend Request</button>
                )
            }
        }
    }

    renderFriends() {
        if (this.props.friends.length > 0) {
            const friends = this.props.friends.map((friend, i) => {
                const image = friend.image ? friend.image : window.no_image;

                return (
                    <li key={friend.id * i}>
                        <div className="friends-border">
                            <div className="friends-image-name">
                                <Link to={`/users/${friend.id}`}><div className="friends-image" style={{ backgroundImage: `url(${image})` }} /></Link>
                                <Link to={`/users/${friend.id}`}><p className="friend-name-p">{friend.name}</p></Link>
                            </div>
                            {this.renderFriendsButton(friend.id)}
                        </div>
                    </li>
                )
            });

            return (
                <div className="friends">
                    <ul>
                        {friends}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="no-friends-text">No friends to show</div>
            )
        }
    }

    render() {
        return (
            <div className="profile-page-container">
                <div className="profile-page-section-container">
                    <div className="profile-page-section-header">
                        <i className="fas fa-user-friends"></i><h2>Friends</h2>
                    </div>
                    <div className="profile-page-section-body">
                        {this.renderFriends()}
                    </div>
                </div>
            </div>
        )
    }
}