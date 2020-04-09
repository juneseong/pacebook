import React from "react";
import { Link } from "react-router-dom";

export default class TopNav extends React.Component {
    render() {
        const { first_name } = this.props.user;
        const firstName = first_name.slice(0, 1).toUpperCase() + first_name.slice(1).toLowerCase();

        return (
            <div className="top-nav-container">
                <div className="top-nav">
                    <ul>
                        <Link to="/"><li><i className="fab fa-facebook-square"></i></li></Link>
                        <li><input type="text" className="search-bar" placeholder="Search"/></li>
                    </ul>

                    <ul>
                        <li><Link to={`/users/${this.props.user.id}`}><p>{firstName}</p></Link></li>
                        <li><Link to="/"><p>Home</p></Link></li>
                        <li><i className="fas fa-user-friends" /><i className="fab fa-facebook-messenger" /><i className="fas fa-bell"></i></li>
                        <li><i className="fas fa-question-circle"></i><i className="fas fa-sort-down" onClick={this.props.logout}></i></li>
                    </ul>
                </div>
            </div>
        )
    }
}