import React from "react";
import Timeline from "./timeline/timeline";
import About from "./about";
import Friends from "./friends";
import Photos from "./photos";
import { Link, Route } from "react-router-dom";

export default class ProfilePage extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.user.email && this.props.match.params.userId !== prevProps.match.params.userId) {
            this.props.fetchUser(this.props.match.params.userId);
        }
    }

    fullName(first_name, last_name) {
        const firstName = first_name.split("").slice(0, 1).join().toUpperCase() + first_name.split("").slice(1).map(letter => letter.toLowerCase()).join("");
        const lastName = last_name.split("").slice(0, 1).join().toUpperCase() + last_name.split("").slice(1).map(letter => letter.toLowerCase()).join("");
        return `${firstName} ${lastName}`;
    }

    render() {
        let fullName;
        let EditProfilePhoto;
        let EditCoverPhoto;

        const { user, currentUser } = this.props;

        if (user.email) {
            const { first_name, last_name } = user;
            fullName = this.fullName(first_name, last_name);

            if (currentUser && currentUser.id === user.id) {
                EditProfilePhoto = () => (
                    <div className="half-circle">
                        <div className="add-photo-text">
                            <i className="fas fa-camera"></i><br />
                            <p>Add Photo</p>
                        </div>
                        <div className="half-circle-left"></div>
                        <div className="half-circle-right"></div>
                    </div>
                );
                
                EditCoverPhoto = () => (
                    <div className="add-cover-photo-text">
                        <i className="fas fa-camera"></i>
                    </div>
                )
            } else {
                EditProfilePhoto = () => (
                    <>
                    </>
                )
                EditCoverPhoto = () => (
                    <>
                    </>
                )
            }
        } else {
            fullName = "";

            EditProfilePhoto = () => (
                <>
                </>
            )
            EditCoverPhoto = () => (
                <>
                </>
            )
        }

        return (
            <div className="profile-container">
                <div className="profile-header">
                    <div className="cover-photo-container">
                        <EditCoverPhoto />
                        <div className="profile-photo-container" style={{ backgroundImage: "url(" + user.profile_img + ")" }}>
                            <EditProfilePhoto />
                        </div>
                        <h2 className="profile-name"><a href="#">{fullName}</a></h2>
                    </div>
                    <div className="profile-nav">
                        <ul>
                            <Link to={`/users/${user.id}`}><li><p>Timeline</p></li></Link>
                            <Link to={`/users/${user.id}/about`}><li><p>About</p></li></Link>
                            <Link to={`/users/${user.id}/friends`}><li><p>Friends</p></li></Link>
                            <Link to={`/users/${user.id}/photos`}><li><p>Photos</p></li></Link>
                            <Link to={`/users/${user.id}`}><li className="profile-nav-last-li"><p>More</p></li></Link>
                        </ul>
                    </div>
                </div>

                <div className="profile-body">    
                    <Route exact path="/users/:userId" render={() => <Timeline user={user} currentUser={currentUser} />} />
                    <Route path="/users/:userId/about" component={About} />
                    <Route path="/users/:userId/friends" render={() => <Friends user={user} currentUser={currentUser} />} />
                    <Route path="/users/:userId/photos" render={() => <Photos user={user} currentUser={currentUser} />} />
                </div> 
            </div>
        )
    }
}