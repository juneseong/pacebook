import React from "react";
import { Link } from "react-router-dom";

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            klass: ""
        };

        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    openDropdown() {
        this.setState({ klass: "dropdown-active" });
    }

    closeDropdown(e) {
        e.preventDefault();
        this.setState({ klass: "" });
    }

    render() {
        const { first_name, id } = this.props.user;
        const firstName = first_name.slice(0, 1).toUpperCase() + first_name.slice(1).toLowerCase();

        return (
            <div className="top-nav-container">
                <div className="top-nav">
                    <ul>
                        <Link to="/"><li><i className="fab fa-facebook-square"></i></li></Link>
                        <li><input type="text" className="search-bar" placeholder="Search"/></li>
                    </ul>

                    <ul>
                        <li><Link to={`/users/${id}`}><p>{firstName}</p></Link></li>
                        <li><Link to="/"><p>Home</p></Link></li>
                        <li><i className="fas fa-user-friends" /><i className="fab fa-facebook-messenger" /><i className="fas fa-bell"></i></li>
                        <li><i className="fas fa-question-circle"></i>
                            <button className="logout-arrow-btn" onClick={this.openDropdown} onBlur={this.closeDropdown}>
                                <i className={`fas fa-caret-down ${this.state.klass}`}></i>
                            </button>
                        </li>
                        <div className={`logout-dropdown ${this.state.klass}`}>
                            <span className="logout-dropdown-tooltip-border" />
                            <span className="logout-dropdown-tooltip" />
                            <p onMouseDown={this.props.logout}>Log Out</p>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}