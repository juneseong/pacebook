import React from "react";
import { Link } from "react-router-dom";

export default class Photos extends React.Component {
    render() {
        return (
            <div className="profile-photos">
                <i className="fas fa-image"></i>
                <Link to={`/users/${this.props.user.id}/photos`}><h3>Photos</h3></Link>
            </div>
        )
    }
}