import React from "react";
import { Link, withRouter } from "react-router-dom";

class Work extends React.Component {
    constructor(props) {
        super(props);

        const { work, school } = props.user;
        this.state = { workEditBtn: "", schoolEditBtn: "", workEdit: false, schoolEdit: false, work, school };
        this.edit = this.edit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, field) {
        e.preventDefault();
        const formData = new FormData();
        formData.append(`user[${field}]`, this.state[field]);
        this.props.updateUser(this.props.user.id, formData);
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
        const buttonField = field + "EditBtn";
        const text = user[field] ? "Edit" : "Add";

        if (currentUser && currentUser.id === user.id) {
            return (
                <div className={`about-info-edit-btn ${this.state[buttonField]}`} onClick={e => this.edit(e, editField)}>
                    <i className="fas fa-pencil-alt"></i>
                    <p>{text}</p>
                </div>
            )
        }
    }

    work() {
        const text = () => {
            if (this.state.work && this.state.work.length > 0) {
                return (<p>Works at <span className="blue-font">{this.state.work}</span></p>);
            } else {
                return (<p className="no-info">No workplaces to show</p>);
            }
        };

        if (this.state.workEdit) {
            return (
                <div className="about-edit-form">
                    <form>
                        <label>Company</label>
                        <input type="text" placeholder="Where have you worked?" onChange={e => this.setState({ work: e.target.value })} value={this.state.work} />
                        <div className="hr" />
                        <div className="about-edit-form-btn">
                            <button onClick={e => this.handleSubmit(e, "work")} className="intro-bio-save-btn">Save Changes</button>
                            <button onClick={() => this.setState({ workEdit: false, work: this.props.user.work })} className="intro-bio-cancel-btn">Cancel</button>
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
                            {this.editButton("work")}
                        </div>
                    </Link>
                </li>
            )
        }
    }

    school() {
        const text = () => {
            if (this.state.school && this.state.school.length > 0) {
                return (<p>Studied at <span className="blue-font">{this.state.school}</span></p>);
            } else {
                return (<p className="no-info">No schools to show</p>);
            }
        };

        if (this.state.schoolEdit) {
            return (
                <div className="about-edit-form">
                    <form>
                        <label>School</label>
                        <input type="text" placeholder="What school did you attend?" onChange={e => this.setState({ school: e.target.value })} value={this.state.school} />
                        <div className="hr" />
                        <div className="about-edit-form-btn">
                            <button onClick={e => this.handleSubmit(e, "school")} className="intro-bio-save-btn">Save Changes</button>
                            <button onClick={() => this.setState({ schoolEdit: false, school: this.props.user.school })} className="intro-bio-cancel-btn">Cancel</button>
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
                            {this.editButton("school")}
                        </div>
                    </Link>
                </li>
            )
        }
    }

    render() {
        return (
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
    }
}

export default withRouter(Work);