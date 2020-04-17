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
                             <p className="blue-font">Add Bio</p>
                         </>
                    )
                } else {
                    return (
                        <>
                             <p>{user.bio}</p>
                             <p className="blue-font">Edit Bio</p>
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
                    <hr />
                </div>
                <div className="profile-intro-info">
                    <div className="profile-intro-info-item">
                        <i className="fas fa-home"></i>
                        <p>Lives in&nbsp;</p><p className="blue-font">New York</p>
                    </div>
                    <div className="profile-intro-info-item">
                        <i className="fas fa-briefcase"></i>
                        <p>Works at&nbsp;</p><p className="blue-font">App Academy</p>
                    </div>
                    <div className="profile-intro-info-item">
                        <i className="fas fa-graduation-cap"></i>
                        <p>Studied at&nbsp;</p><p className="blue-font">App Academy</p>
                    </div>
                    <div className="profile-intro-info-item">
                        <i className="far fa-clock"></i>
                        <p>Joined {user.created_at}</p>
                    </div>
                </div>
            </div>
        )
    }
}