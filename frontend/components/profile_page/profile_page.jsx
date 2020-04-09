import React from "react";
import Timeline from "./timeline";
import About from "./about";
import Friends from "./friends";
import Photos from "./photos";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline: "active",
            about: "",
            friends: "",
            photos: ""
        };
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.user.email && this.props.match.params.userId !== prevProps.match.params.userId) {
            this.props.fetchUser(this.props.match.params.userId);
        }
    }

    activate(nav) {
        return e => (
            this.setState({ 
                timeline: "",
                about: "",
                friends: "",
                photos: "",
                [nav]: "active"
             })
        );
    }

    render() {
        let fullName;
        if (this.props.user.email) {
            const { first_name, last_name } = this.props.user;
            const firstName = first_name.split("").slice(0, 1).join().toUpperCase() + first_name.split("").slice(1).map(letter => letter.toLowerCase()).join("");
            const lastName = last_name.split("").slice(0, 1).join().toUpperCase() + last_name.split("").slice(1).map(letter => letter.toLowerCase()).join("");
            fullName = `${firstName} ${lastName}`;
        } else {
            fullName = "";
        }

        return (
            <div className="profile-container">
                <div className="profile-header">
                    <div className="cover-photo-container">
                        <div className="profile-photo-container">
                            <div className="add-photo-button">
                                <div className="half-circle">
                                    <div className="add-photo-text">
                                        <i className="fas fa-camera"></i><br />
                                        <p>Add Photo</p>
                                    </div>
                                    <div className="half-circle-left"></div>
                                    <div className="half-circle-right"></div>
                                </div>
                            </div>
                        </div>
                        <h2 className="profile-name"><a href="#">{fullName}</a></h2>
                    </div>
                    <div className="profile-nav">
                        <ul>
                            <li onClick={this.activate("timeline")}><p>Timeline</p></li>
                            <li onClick={this.activate("about")}><p>About</p></li>
                            <li onClick={this.activate("friends")}><p>Friends</p></li>
                            <li onClick={this.activate("photos")}><p>Photos</p></li>
                            <li><p>More</p></li>
                        </ul>
                    </div>
                </div>

                <div className="profile-body">
                    <div className={`profile-timeline-container ${this.state.timeline}`}>
                        <Timeline />
                    </div>
                    <div className={`profile-about-container ${this.state.about}`}>
                        <About />
                    </div>
                    <div className={`profile-friends-container ${this.state.friends}`}>
                        <Friends />
                    </div>
                    <div className={`profile-photos-container ${this.state.photos}`}>
                        <Photos />
                    </div>
                </div>
            </div>
        )
    }
}