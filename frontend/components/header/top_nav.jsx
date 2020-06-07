import React from "react";
import { Link, withRouter } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

class TopNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            klass: "",
            pendingColor: "",
            search: "",
            focused: false,
            searchBtn: "",
            friendClass: "",
            friendColor: "",
            notificationClass: "",
            notificationColor: ""
        };

        this.logout = this.logout.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.readFriendRequests = this.readFriendRequests.bind(this);
        this.readNotifications = this.readNotifications.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            window.addEventListener("click", e => {
                if (!e.target.closest(`[id=friend-notification]`)) {
                    this.setState({ friendClass: "", friendColor: "" });
                }

                if (!e.target.closest(`[id=notification]`) || e.target.closest(`[id=notification-link]`)) {
                    this.setState({ notificationClass: "", notificationColor: "" });
                }
            });

        }
    }

    componentDidUpdate() {
        const post = document.getElementById(this.props.history.location.hash.split("").slice(1).join(""));
        if (post && !post.nextSibling.className.includes("highlight")) {
            post.nextSibling.classList.add("highlight");

            setTimeout(function () {
                post.nextSibling.classList.add("remove");
            }, 1200);
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    logout() {
        this.props.logout()
            .then(() => this.props.history.push("/"));
    }

    openDropdown(e) {
        e.preventDefault();
        this.setState({ klass: "dropdown-active" });
    }

    closeDropdown(e) {
        this.setState({ klass: "" });
    }

    friendNotifications() {      
        if (this.props.unreadRequestsCount > 0) {
            return (
                <div onClick={this.readFriendRequests} className="friend-notification" id="friend-notification">
                    <div className="friend-notification-count">
                        <p>{this.props.unreadRequestsCount}</p>
                    </div>
                    <i className="fas fa-user-friends" style={{ color: "#fff" }}></i>
                </div>
            )
        } else {
            return (
                <i id="friend-notification" style={{ color: this.state.friendColor }} onClick={() => this.setState({ friendClass: "active", friendColor: "#fff" })} className="fas fa-user-friends">
                </i>
            )
        }
    }

    friendRequests() {
        if (this.props.pendingFriends.length > 0) {
            const friendRequests = this.props.pendingFriends.map((friend, i) => {
                const image = friend.requester_img ? friend.requester_img : window.no_image;

                return (
                    <li key={`friend-${friend.id * i}`}>
                        <div className="pending-friend-img-name">
                            <Link to={`/users/${friend.requester_id}`}><div className="pending-friend-img" style={{ backgroundImage: `url(${image})` }}></div></Link>
                            <Link to={`/users/${friend.requester_id}`}>{friend.requester_name}</Link>
                        </div>
                        <div className="pending-friend-btn">
                            <button onClick={() => this.props.acceptFriend({ id: friend.id })} className="intro-bio-save-btn">Confirm</button>
                            <button onClick={() => this.props.deleteFriend({ requestee_id: friend.requester_id })} className="intro-bio-cancel-btn">Delete</button>
                        </div>
                    </li>
                )
            })

            return (<>{friendRequests}</>);
        } else {
            return (
                <div className="no-new-friend-requests">
                    No new requests
                </div>
            )
        }
    }

    readFriendRequests() {
        this.setState({ friendClass: "active", friendColor: "#fff" });

        this.props.newFriendRequests.forEach(request => {
            this.props.readNotification(request.id);
        })
    }

    otherNotifications() {
        if (this.props.unreadNotificationsCount > 0) {
            return (
                <div className="friend-notification" onClick={this.readNotifications} id="notification">
                    <div className="friend-notification-count">
                        <p>{this.props.unreadNotificationsCount}</p>
                    </div>
                    <i className="fas fa-bell" style={{ color: "#fff" }}></i>
                </div>
            )
        } else {
            return (
                <i className="fas fa-bell" style={{ color: this.state.notificationColor }} onClick={() => this.setState({ notificationClass: "active", notificationColor: "#fff" })} id="notification"></i>
            )
        }
    }

    notifications() {
        if (this.props.notifications.length > 0) {
            const notifications = this.props.notifications.map((notification, i) => {
                const image = notification.sender_img ? notification.sender_img : window.no_image;
                let text;
                let linkText;
                
                switch(notification.type) {
                    case "Post":
                        text = "posted on your";
                        linkText = "wall";
                        break;
                    case "Comment":
                        text = "commented on your";
                        linkText = "post";
                        break;
                    case "Like_Post":
                        text = "liked your";
                        linkText = "post";
                        break;
                    case "Like_Comment":
                        text = "liked your";
                        linkText = "comment";
                        break;
                }

                return (
                    <li key={`no-${notification.id * i}`}>
                        <div className="pending-friend-img-name">
                            <Link to={`/users/${notification.sender_id}`}><div className="pending-friend-img" style={{ backgroundImage: `url(${image})` }}></div></Link>
                            <Link to={`/users/${notification.sender_id}`}>{notification.sender_name}</Link><span>{text} <span id="notification-link"><HashLink to={`/users/${notification.post_user_id}/#${notification.post_id}`}>{linkText}</HashLink></span>.</span>
                        </div>
                    </li>
                )
            })

            return (<>{notifications}</>);
        } else {
            return (
                <div className="no-new-friend-requests">
                    No notifications
                </div>
            )
        }
    }

    readNotifications() {
        this.setState({ notificationClass: "active", notificationColor: "#fff" });

        this.props.notifications.forEach(notification => {
            if (!notification.read) {
                this.props.readNotification(notification.id);
            }
        })
    }

    handleChange(e) {
        this.setState({ search: e.currentTarget.value });
        this.props.searchUsers(e.currentTarget.value);
    }

    handleLink(userId) {
        this.props.history.push(`/users/${userId}`);
        this.setState({ search: "" });
        this.props.searchUsers("");
    }

    render() {
        const { first_name, id } = this.props.user;
        let users = Object.values(this.props.users);
        let searchResults;

        if (this.state.focused) {
            if (users.length > 0) {
                searchResults = users.map((user, i) => {
                    const indices = [];

                    for (let i = 0; i < user.name.length; i++) {
                        if (user.name.split("").slice(i, i + this.state.search.length).join("").toLowerCase() === this.state.search.toLowerCase()) {
                            for (let j = i; j < i + this.state.search.length; j++) {
                                indices.push(j);
                            }
                        }
                    };

                    const name = user.name.split("").map((letter, i) => {
                        if (indices.includes(i)) {
                            return (<span key={i}>{letter}</span>);
                        } else {
                            return (
                                <span key={i} style={{ fontWeight: "bold" }}>
                                    {letter}
                                </span>
                            )
                        }
                    });

                    return (
                        <li key={user.id + i} onMouseDown={() => this.handleLink(user.id)}>
                            {name}
                        </li>
                    )
                });
            } else if (this.state.search.length > 0) {
                searchResults = [this.state.search].map((result, i) => <li key={i}>{result}</li>);
            }
        }

        return (
            <div className="top-nav-container">
                <div className="top-nav">
                    <ul>
                        <Link to="/"><li><i className="fab fa-facebook-f"></i></li></Link>
                        <li className="search-bar-li">
                            <div className={`search-icon ${this.state.searchBtn}`}><i className="fas fa-search"></i></div>
                            <input type="text" className="search-bar" placeholder="Search" value={this.state.search} onChange={this.handleChange} onFocus={() => this.setState({ focused: true, searchBtn: "active" })} onBlur={() => this.setState({ focused: false, searchBtn: "" })} />
                            <div className="search-results">
                                <ul>
                                    {searchResults}
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <Link to={`/users/${id}`}><li className="top-nav-prof-img-li top-nav-hover"><p>{first_name}</p></li></Link>
                        <div className="top-nav-divider" />
                        <Link to="/"><li className="top-nav-hover"><p>Home</p></li></Link>
                        <div className="top-nav-divider" />
                        <li>
                            {this.friendNotifications()}
                            <div className={`notifications-tooltip ${this.state.friendClass}`} />
                            <div className={`notifications-container ${this.state.friendClass}`} id="friend-notification">
                                <div className="notifications-header">
                                    Friend Requests
                                </div>
                                <div className="notifications-content">
                                    <ul>
                                        {this.friendRequests()}
                                    </ul>
                                </div>
                            </div>
                            {this.otherNotifications()}
                            <div className={`notifications-tooltip ${this.state.notificationClass} other`} />
                            <div className={`notifications-container ${this.state.notificationClass} other`} id="notification">
                                <div className="notifications-header">
                                    Notifications
                                </div>
                                <div className="notifications-content">
                                    <ul>
                                        {this.notifications()}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <div className="top-nav-divider" />
                        <li className="top-nav-last-li">
                            <i className="fas fa-question-circle"></i>
                            <button className="logout-arrow-btn" onClick={this.openDropdown} onBlur={this.closeDropdown}>
                                <i className={`fas fa-caret-down ${this.state.klass}`}></i>
                            </button>
                            <div className={`logout-dropdown ${this.state.klass}`} onMouseDown={this.openDropdown}>
                                <span className="logout-dropdown-tooltip-border" />
                                <span className="logout-dropdown-tooltip" />
                                <p onMouseDown={this.logout}>Log Out</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(TopNav);