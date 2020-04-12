import React from "react";

export default class Intro extends React.Component {
    render() {
        const { user, currentUser } = this.props;
        if (user === null) return null;
        const Bio = () => {
            if (currentUser && user.id === currentUser.id) {
                if (user.bio === null) {
                    return (
                        <>
                             <p>Add a short bio to tell people more about yourself.</p>
                             <p>Add Bio</p>
                             <hr />
                         </>
                    )
                } else {
                    return (
                        <>
                             <p>{user.bio}</p>
                             <p>Edit Bio</p>
                             <hr />
                         </>
                    )
                }
            } else {
                if (user.bio === null) {
                    return (<></>)
                } else {
                    return (
                        <>
                             <p>{user.bio}</p>
                             <hr />
                         </>
                    )
                }
            }
        }

        return (
            <div className="profile-intro">
                <div className="profile-intro-bio">
                    <i className="fas fa-globe-americas"></i>
                    <h3>Intro</h3>
                    <Bio />
                </div>
                <div className="profile-intro-info">
                    <div className="profile-intro-info-item">
                        <i className="fas fa-home"></i>
                        <p>Lives in New York</p>
                    </div>
                    <div className="profile-intro-info-item">
                        <i className="fas fa-briefcase"></i>
                        <p>Works at App Academy</p>
                    </div>
                    <div className="profile-intro-info-item">
                        <i className="fas fa-graduation-cap"></i>
                        <p>Studied at App Academy</p>
                    </div>
                    <div className="profile-intro-info-item">
                        <i className="far fa-clock"></i>
                        <p>Joined November 2019</p>
                    </div>
                </div>
            </div>
        )
    }
}