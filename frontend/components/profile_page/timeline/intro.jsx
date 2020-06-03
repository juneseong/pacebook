import React from "react";
import { Link } from "react-router-dom";

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

    handleFocus(e) {
        e.currentTarget.selectionStart = e.currentTarget.value.length;
        e.currentTarget.selectionEnd = e.currentTarget.value.length;
        e.currentTarget.focus();
    }

    bio() {
        if (this.state.updateBio) {
            return (
                <>
                    <form>
                        <textarea value={this.state.bio} onChange={this.update} autoFocus onFocus={this.handleFocus} />
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
                    <p onClick={() => this.setState({ updateBio: true })} className="blue-font">{this.state.bioBtn}</p>
                </>
            );
        }
    }

    renderUserInfo(field) {
        const { user } = this.props;

        if (user[field]) {
            let icon;
            let text;
            let link;
            let info = user[field];

            switch (field) {
                case "city":
                    info = `${user[field]}, ${user.state}`;
                    text = "Lives in"
                    icon = "fas fa-home";
                    link = "place";
                    break;
                case "work":
                    text = "Works at";
                    icon = "fas fa-briefcase";
                    link = "work";
                    break;
                case "school":
                    text = "Studied at";
                    icon = "fas fa-graduation-cap";
                    link = "work";
                    break
            }

            return (
                <div className="profile-intro-info-item">
                    <i className={icon}></i>
                    <p>{text}&nbsp;</p><Link to={`/users/${user.id}/about/${link}`}><p className="blue-font">{info}</p></Link>
                </div>
            )
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
                    <div className="hr" />
                </div>
                <div className="profile-intro-info">
                    {this.renderUserInfo("city")}
                    {this.renderUserInfo("work")}
                    {this.renderUserInfo("school")}
                    <div className="profile-intro-info-item join">
                        <i className="far fa-clock"></i>
                        <p>Joined {user.created_at}</p>
                    </div>
                </div>
            </div>
        )
    }
}