import React from "react";
import { Link, Route, withRouter } from "react-router-dom";

class About extends React.Component {
    constructor(props) {
        super(props);

        const { work, school, city, state } = props.user;
        this.state = { workEditBtn: "", schoolEditBtn: "", cityStateEditBtn: "", workEdit: false, schoolEdit: false, cityEdit: false, work, school, city, state };
        this.edit = this.edit.bind(this);
    }

    edit(e, field) {
        let url = this.props.location.pathname.split("/");

        if (url.length > 4) {
            e.preventDefault();
            this.setState({ [field]: true });
        }
    }

    editButton(field) {
        const { user, currentUser } = this.props;
        const editField = field + "Edit";
        const text = user[field] ? "Edit" : "Add";

        if (currentUser && currentUser.id === user.id) {
            return (
                <>
                    <i className="fas fa-pencil-alt"></i>
                    <p onClick={e => this.edit(e, editField)}>{text}</p>
                </>
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

        if (this.state.workEdit) {
            return (
                <div className="about-edit-form">
                    <form>
                        <label>Company</label>
                        <input type="text" placeholder="Where have you worked?" value={this.state.work} />
                        <div className="hr" />
                        <div className="about-edit-form-btn">
                            <button className="intro-bio-save-btn">Save Changes</button>
                            <button onClick={() => this.setState({ workEdit: false })} className="intro-bio-cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <li onMouseEnter={() => this.setState({ workEditBtn: "active" })} onMouseLeave={() => this.setState({ workEditBtn: "" })}>
                    <Link to={`/users/${this.props.user.id}/about/work`}>
                        <div>
                            <i className="fas fa-briefcase"></i>
                            {text()}
                            <div className={`about-info-edit-btn ${this.state.workEditBtn}`}>
                                {this.editButton("work")}
                            </div>
                        </div>
                    </Link>
                </li>
            )
        }
    }

    school() {
        const text = () => {
            if (this.props.user.school && this.props.user.school.length > 0) {
                return (<p>Studied at <span className="blue-font">{this.props.user.school}</span></p>);
            } else {
                return (<p className="no-info">No schools to show</p>);
            }
        };

        if (this.state.schoolEdit) {
            return (
                <div className="about-edit-form">
                    <form>
                        <label>School</label>
                        <input type="text" placeholder="What school did you attend?" value={this.state.school} />
                        <div className="hr" />
                        <div className="about-edit-form-btn">
                            <button className="intro-bio-save-btn">Save Changes</button>
                            <button onClick={() => this.setState({ schoolEdit: false })} className="intro-bio-cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <li onMouseEnter={() => this.setState({ schoolEditBtn: "active" })} onMouseLeave={() => this.setState({ schoolEditBtn: "" })}>
                    <Link to={`/users/${this.props.user.id}/about/work`}>
                        <div>
                            <i className="fas fa-user-graduate"></i>
                            {text()}
                            <div className={`about-info-edit-btn ${this.state.schoolEditBtn}`}>
                                {this.editButton("school")}
                            </div>
                        </div>
                    </Link>
                </li>
            )
        }
    }

    cityState() {
        const text = () => {
            if (this.props.user.city && this.props.user.city.length > 0) {
                return (<p>Lives in <span className="blue-font">{this.props.user.city}</span>, <span className="blue-font">{this.props.user.state}</span></p>);
            } else {
                return (<p className="no-info">No places to show</p>);
            }
        };


        if (this.state.cityEdit) {
            return (
                <div className="about-edit-form">
                    <form>
                        <label>Current City</label>
                        <input type="text" value={this.state.city} />
                        <label>Current State</label>
                        <input type="text" value={this.state.state} />
                        <div className="hr" />
                        <div className="about-edit-form-btn">
                            <button className="intro-bio-save-btn">Save Changes</button>
                            <button onClick={() => this.setState({ cityEdit: false })} className="intro-bio-cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <li onMouseEnter={() => this.setState({ cityStateEditBtn: "active" })} onMouseLeave={() => this.setState({ cityStateEditBtn: "" })}>
                    <Link to={`/users/${this.props.user.id}/about/place`}>
                        <div>
                            <i className="fas fa-map-marker-alt"></i>
                            {text()}
                            <div className={`about-info-edit-btn ${this.state.cityStateEditBtn}`}>
                                {this.editButton("city")}
                            </div>
                        </div>
                    </Link>
                </li>
            )
        }
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

        const Work = () => (
            <div className="about-info">
                <ul>
                    <div className="about-header"><p>Work</p></div>
                    {this.work()}
                </ul>
                <ul>
                    <div className="about-header"><p>Education</p></div>
                    {this.school()}
                </ul>
            </div>
        ) 

        const Place = () => (
            <div className="about-info">
                <ul>
                    <div className="about-header"><p>Current City</p></div>
                    {this.cityState()}
                </ul>
            </div>
        ) 

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
                            <Route path="/users/:userId/about/work" render={() => <Work />} />
                            <Route path="/users/:userId/about/place" render={() => <Place />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(About);