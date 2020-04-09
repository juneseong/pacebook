import React from "react";

export default class Timeline extends React.Component {
    render() {
        return (
            <>
                <div className="profile-body-left">
                    <div className="profile-intro">
                        <div className="profile-intro-bio">
                            <h3>Intro</h3>

                            <p>Add a short bio to tell people more about yourself.</p>
                            <p>Add Bio</p>
                        </div>
                        <hr />
                        <div className="profile-intro-info">
                            <p>Current City</p>
                            <p>Workplace</p>
                            <p>School</p>
                            <p>Hometown</p>
                            <p>Relationship Status</p>
                        </div>
                    </div>
                    <div className="profile-photos">
                        <h3>Photos</h3>
                    </div>
                    <div className="profile-friends">
                        <h3>Friends</h3>
                    </div>
                </div>
                <div className="profile-body-right">
                    <div className="profile-post-form">

                    </div>
                    <div className="profile-posts">

                    </div>
                </div>
            </>
        )
    }
}