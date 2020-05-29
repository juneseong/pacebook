import React from "react";

export default class Intro extends React.Component {
    constructor(props) {
        super(props);

        const { user, currentUser } = this.props;
        let bio = user.bio ? user.bio : "";
        let bioBtn = null;
        let letterCount = null;

        if (currentUser && user.id === currentUser.id) {

            if (!user.bio || user.bio === "") {
                bioBtn = "Add Bio";
                letterCount = 0;
            } else {
                bioBtn = "Edit Bio";
                letterCount = 100 - user.bio.length;
            }
        }

        this.state = { bio, bioBtn, updateBio: false, letterCount };
        this.update = this.update.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.bio = this.bio.bind(this);
    }

    update(e) {
        if (e.currentTarget.value.length <= 100) {
            this.setState({ bio: e.currentTarget.value, letterCount: 100 - e.currentTarget.value.length });
        }
    }

    handleCancel(e) {
        e.preventDefault();
        let bio = this.props.user.bio ? this.props.user.bio : "";
        this.setState({ updateBio: false, bio });
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user[bio]", this.state.bio);
        this.props.updateUser(this.props.currentUser.id, formData);
        let bio = this.props.user.bio ? this.props.user.bio : "";
        this.setState({ updateBio: false, bio });
    }

    bio() {
        if (this.state.updateBio) {
            return (
                <>
                    <form>
                        <textarea value={this.state.bio} onChange={this.update} />
                        <div className="intro-bio-letter-count">{this.state.letterCount}</div>
                        <button className="intro-bio-cancel-btn" onClick={this.handleCancel}>Cancel</button>
                        <button className="intro-bio-save-btn" onClick={this.handleSubmit}>Save</button>
                    </form>
                </>
            )
        } else {
            let bio = this.state.bio;
            let color = "";
            const { user, currentUser } = this.props;
            if (currentUser && user.id === currentUser.id && (!bio || bio === "")) {
                bio = "Add a short bio to tell people more about yourself.";
            } else {
                color = "#1d2129";
            }

            return (
                <>
                    <p style={{color}}>{bio}</p>
                    <p onClick={() => this.setState({updateBio: true})} className="blue-font">{this.state.bioBtn}</p>
                </>
            );
        }
    }

    render() {
        const { user } = this.props;
        if (user === null) return null;

        return (
            <div className="profile-intro">
                <div className="profile-intro-bio">
                    <i className="fas fa-globe-americas"></i>
                    <h3>Intro</h3>
                    {this.bio()}
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