import React from "react";

export default class Photos extends React.Component {
    render() {
        return (
            <div className="profile-page-container">
                <div className="profile-page-section-container">
                    <div className="profile-page-section-header">
                        <i className="fas fa-image"></i><h2>Photos</h2>
                    </div>
                    <div className="profile-page-section-body">
                        <div className="no-friends-text">No photos to show</div>
                    </div>
                </div>
            </div>
        )
    }
}