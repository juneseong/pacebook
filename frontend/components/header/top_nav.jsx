import React from "react";
import { Link, withRouter } from "react-router-dom";

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            klass: "",
            pendingColor: "",
            search: "",
            focused: false,
            searchBtn: ""
        };

        this.logout = this.logout.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.friendNotification = this.friendNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLink = this.handleLink.bind(this);
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