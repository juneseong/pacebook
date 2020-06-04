import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Work from "./work";
import Place from "./place";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = { workEditBtn: "", schoolEditBtn: "", cityEditBtn: "" };
    }

    editButton(field) {
        const { user, currentUser } = this.props;
        const buttonField = field + "EditBtn";
        const text = user[field] ? "Edit" : "Add";

        if (currentUser && currentUser.id === user.id) {
            return (
                <div className={`about-info-edit-btn ${this.state[buttonField]}`}>
                    <i className="fas fa-pencil-alt"></i>
                    <p>{text}</p>
                </div>
            )
        }
    }

    work() {
        const text = () => {
            if (this.props.user.work && this.props.user.work.length > 0) {
                return (<p>Works at <span className="blue-font">{this.props.user.work}</span></p>);
            } else {
                return (<p className="no-info">No workplaces to show</p>);
            }
        };

        return (
            <li onMouseEnter={() => this.setState({ workEditBtn: "active" })} onMouseLeave={() => this.setState({ workEditBtn: "" })}>
                <Link to={`/users/${this.props.user.id}/about/work`}>
                    <div>
                        <i className="fas fa-briefcase"></i>
                        {text()}
                        {this.editButton("work")}
                    </div>
                </Link>
            </li>
        )
    }

    school() {
        const text = () => {
            if (this.props.user.school && this.props.user.school.length > 0) {
                return (<p>Studied at <span className="blue-font">{this.props.user.school}</span></p>);
            } else {
                return (<p className="no-info">No schools to show</p>);
            }
        };

        return (
            <li onMouseEnter={() => this.setState({ schoolEditBtn: "active" })} onMouseLeave={() => this.setState({ schoolEditBtn: "" })}>
                <Link to={`/users/${this.props.user.id}/about/work`}>
                    <div>
                        <i className="fas fa-user-graduate"></i>
                        {text()}
                        {this.editButton("school")}
                    </div>
                </Link>
            </li>
        )
    }

    cityState() {
        const text = () => {
            if (this.props.user.city && this.props.user.city.length > 0) {
                return (<p>Lives in <span className="blue-font">{this.props.user.city}</span>, <span className="blue-font">{this.props.user.state}</span></p>);
            } else {
                return (<p className="no-info">No places to show</p>);
            }
        };

        return (
            <li onMouseEnter={() => this.setState({ cityEditBtn: "active" })} onMouseLeave={() => this.setState({ cityEditBtn: "" })}>
                <Link to={`/users/${this.props.user.id}/about/place`}>
                    <div>
                        <i className="fas fa-map-marker-alt"></i>
                        {text()}
                        {this.editButton("city")}
                    </div>
                </Link>
            </li>
        )
    }

    renderMenu(menu) {
        let text;
        let link = `about/${menu}`;
        switch (menu) {
            case "":
                text = "Overview";
                link = "about"
                break;
            case "work":
                text = "Work and Education";
                break;
            case "place":
                text = "Places Lived";
                break;
        }

        let url = this.props.location.pathname.slice(1).split("/").slice(2);
        if (menu === "") url.push("");

        if (url[1] === menu) {
            return (
                <Link to={`/users/${this.props.user.id}/${link}`}>
                    <div className="about-menu-bar"></div>
                    <li><p style={{ fontWeight: "bold", color: "#4b4f56" }}>{text}</p></li>
                </Link>
            )
        } else {
            return (
                <Link to={`/users/${this.props.user.id}/${link}`}>
                    <li><p>{text}</p></li>
                </Link>
            )
        }
    }

    render() {
        const Overview = () => {
            return (
                <div className="overview about-info">
                        <p className="about-cake-p"><i className="fas fa-birthday-cake"></i> {this.props.user.birth_date}</p>
                    <ul>
                        {this.work()}
                        {this.school()}
                        {this.cityState()}
                    </ul>
                </div>
            )
        } 

        return (
            <div className="profile-page-container">
                <div className="profile-page-section-container">
                    <div className="profile-page-section-header">
                        <i className="fas fa-user"></i><h2>About</h2>
                    </div>
                    <div className="profile-page-section-body about">
                        <ul className="about-menu">
                            {this.renderMenu("")}
                            {this.renderMenu("work")}
                            {this.renderMenu("place")}
                        </ul>
                        <div className="about-container">
                            <Route exact path="/users/:userId/about" component={() => <Overview />} />
                            <Route path="/users/:userId/about/work" render={() => <Work updateUser={this.props.updateUser} user={this.props.user} currentUser={this.props.currentUser} />} />
                            <Route path="/users/:userId/about/place" render={() => <Place updateUser={this.props.updateUser} user={this.props.user} currentUser={this.props.currentUser} />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(About);