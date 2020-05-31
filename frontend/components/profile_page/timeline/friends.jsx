import React from "react";
import { Link } from "react-router-dom";

export default class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = { count: props.friends.length > 0 ? `· ${props.friends.length}` : null };
    }

    render() {
        const friends = this.props.friends.map((friend, i) => {
            const image = friend.image ? friend.image : window.no_image;
            const liName = i % 3 === 0 ? "" : "profile-friends-li-p";

            return (
                <li key={i} className={liName}>
                    <Link to={`/users/${friend.id}`}><div style={{ backgroundImage: `url(${image})` }}></div></Link>
                    <Link to={`/users/${friend.id}`}><p>{friend.name}</p></Link>
                </li>
            )
        });

        return (
            <div className="profile-friends">
                <div>
                    <i className="fas fa-user-friends"></i>
                    <h3>Friends</h3>
                    <p className="profile-friends-count">{this.state.count}</p>
                </div>
                <ul className="friend-list">
                    {friends}
                </ul>
            </div>
        )
    }
}