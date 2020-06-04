import React from "react";
import { Link, withRouter } from "react-router-dom";

class Place extends React.Component {
    constructor(props) {
        super(props);

        const { city, state } = props.user;
        this.state = { cityEditBtn: "", cityEdit: false, city, state };
        this.edit = this.edit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (((this.state.city || this.state.city.length > 0) && (this.state.state || this.state.state.length > 0)) || (this.state.city.length === 0 && this.state.state.length === 0)) {
            const formData = new FormData();
            formData.append(`user[city]`, this.state.city);
            formData.append(`user[state]`, this.state.state);
            this.props.updateUser(this.props.user.id, formData);
        }
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

    cityState() {
        const text = () => {
            if (this.state.city && this.state.city.length > 0) {
                return (<p>Lives in <span className="blue-font">{this.state.city}</span>, <span className="blue-font">{this.state.state}</span></p>);
            } else {
                return (<p className="no-info">No places to show</p>);
            }
        };

        if (this.state.cityEdit) {
            return (
                <div className="about-edit-form">
                    <form>
                        <label>Current City</label>
                        <input type="text" onChange={e => this.setState({ city: e.target.value })} value={this.state.city} />
                        <label>Current State</label>
                        <input type="text" onChange={e => this.setState({ state: e.target.value })} value={this.state.state} />
                        <div className="hr" />
                        <div className="about-edit-form-btn">
                            <button onClick={this.handleSubmit} className="intro-bio-save-btn">Save Changes</button>
                            <button onClick={() => this.setState({ cityEdit: false, city: this.props.user.city, state: this.props.user.state })} className="intro-bio-cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            )
        } else {
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
    }

    render() {
        return (
            <div className="about-info">
                <ul>
                    <div className="about-header"><p>Current City</p></div>
                    {this.cityState()}
                </ul>
            </div>
        )
    }
}

export default withRouter(Place);