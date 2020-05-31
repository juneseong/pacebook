import React from "react";
import { Link, withRouter } from "react-router-dom";

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            klass: "",
            pendingColor: ""
        };

        this.logout = this.logout.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.friendNotification = this.friendNotification.bind(this);
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

    friendNotification() {
        if (this.props.pendingFriends.length > 0) {
            return (
                <div className="friend-notification">
                    <div className="friend-notification-count">
                        <p>{this.props.pendingFriends.length}</p>
                    </div>
                    <i className="fas fa-user-friends" style={{ color: "#fff" }}></i>
                </div>
            )
        } else {
            return (
                <i className="fas fa-user-friends">
                </i>
            )
        }
    }

    render() {
        const { first_name, id } = this.props.user;

        return (
            <div className="top-nav-container">
                <div className="top-nav">
                    <ul>
                        <Link to="/"><li><i className="fab fa-facebook-f"></i></li></Link>
                        <li className="search-bar-li">
                            <div className="search-icon"><i className="fas fa-search"></i></div>
                            <input type="text" className="search-bar" placeholder="Search"/>
                        </li>
                    </ul>

                    <ul>
                        <li className="top-nav-prof-img-li"><Link to={`/users/${id}`}><p>{first_name}</p></Link></li>
                        <li><Link to="/"><p>Home</p></Link></li>
                        <li>{this.friendNotification()}<i className="fab fa-facebook-messenger" /><i className="fas fa-bell"></i></li>
                        <li><i className="fas fa-question-circle"></i>
                            <button className="logout-arrow-btn" onClick={this.openDropdown} onBlur={this.closeDropdown}>
                                <i className={`fas fa-caret-down ${this.state.klass}`}></i>
                            </button>
                        </li>
                        <div className={`logout-dropdown ${this.state.klass}`} onMouseDown={this.openDropdown}>
                            <span className="logout-dropdown-tooltip-border" />
                            <span className="logout-dropdown-tooltip" />
                            <p onMouseDown={this.logout}>Log Out</p>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(TopNav);