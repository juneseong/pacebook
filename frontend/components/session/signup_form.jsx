import React from "react";
import DateSelectItem from "./date_select_item";

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.user,
            klass: { birthdayMsg: "", genderMsg: "", firstName: "", lastName: "", email: "", password: "" }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMsgOpen = this.handleMsgOpen.bind(this);
        this.handleMsgClose = this.handleMsgClose.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    updateDate(field) {
        return e => this.setState({ birth_date: { ...this.state.birth_date, [field]: e.currentTarget.value } });
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = Object.assign({}, this.state);
        const { month, day, year } = this.state.birth_date;
        user["birth_date"] = new Date(`${month}-${day}-${year} 00:00:00`);
        this.props.signup(user);
    }

    handleBlur(input) {
        return e => {
            if (e.currentTarget.value === "") {
                this.setState({ klass: { ...this.state.klass, [input]: "error-active" } });
            } else {
                this.setState({ klass: { ...this.state.klass, [input]: "" } });
            }
        };
    }

    handleFocus(input) {
        return e => { 
            this.setState({ klass: { ...this.state.klass, [input]: "" } });
        };
    }

    handleMsgOpen(klass) {
        return e => {
            e.preventDefault();
            this.setState({ klass: { ...this.state.klass, [klass]: "msg-active" } });
        };
    }

    handleMsgClose(e) {
        e.stopPropagation();
        this.setState({ klass: { ...this.state.klass, birthdayMsg: "", genderMsg: "" } });
    }

    renderErrors() {
        const klass = this.props.errors.length > 0 ? "active" : "";

        const errors = this.props.errors.map((error, i) => {
            return <li key={i} className={`signup-error-msg ${klass}`}>{error}</li>;
        }).slice(0, 1);

        return (
            <div className="signup-error-msg-container">
                <ul>
                    {errors}
                </ul>
            </div>
        )
    }

    render() {
        const range = (start, end) => {
            const numArr = [];
            for (let i = start; i < end + 1; i++) numArr.push(i);
            return numArr;
        };

        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayArr = range(1, 31);
        const yearArr = range(1905, new Date().getFullYear());

        const dateSelect = dateArr => (
            dateArr.map((value, index) => <DateSelectItem key={index} value={index} text={value} />)
        );

        return (
            <>
                <div className="signup-form-container">
                    <div className="signup-form-header">
                        {this.renderErrors()}
                        <h1>Sign Up</h1>
                        <p>It's quick and easy.</p>
                        
                    </div>
                    <div className="signup-form">
                        <form>
                            <div className="name-input">
                                <i className={`fas fa-exclamation-circle first-name ${this.state.klass.firstName}`}></i>
                                <input 
                                    className={`name-input-item first ${this.state.klass.firstName}`} 
                                    onFocus={this.handleFocus("firstName")} 
                                    onBlur={this.handleBlur("firstName")} 
                                    onChange={this.update("first_name")} 
                                    type="text" placeholder="First name" 
                                    value={this.state.first_name}>
                                </input>
                                <i className={`fas fa-exclamation-circle last-name ${this.state.klass.lastName}`}></i>
                                <input 
                                    className={`name-input-item ${this.state.klass.lastName}`} 
                                    onFocus={this.handleFocus("lastName")} 
                                    onBlur={this.handleBlur("lastName")} 
                                    onChange={this.update("last_name")} 
                                    type="text" placeholder="Last name" 
                                    value={this.state.last_name}>
                                </input>
                            </div>
                            <i className={`fas fa-exclamation-circle email ${this.state.klass.email}`}></i>
                            <input 
                                className={`name-input-item ${this.state.klass.email}`} 
                                onFocus={this.handleFocus("email")} 
                                onBlur={this.handleBlur("email")} 
                                onChange={this.update("email")} 
                                type="email" 
                                placeholder="Email address" 
                                value={this.state.email}> 
                            </input>
                            <i className={`fas fa-exclamation-circle email ${this.state.klass.password}`}></i>
                            <input 
                                className={`name-input-item ${this.state.klass.password}`} 
                                onFocus={this.handleFocus("password")} 
                                onBlur={this.handleBlur("password")} 
                                onChange={this.update("password")} 
                                type="password" 
                                placeholder="New password" 
                                value={this.state.password}>
                            </input>
                            <label>
                                <h2>Birthday</h2>
                                <select onChange={this.updateDate("month")} value={this.state.birth_date.month}>
                                    <option disabled="disabled">Month</option> 
                                    {dateSelect(monthArr)}
                                </select>
                                <select onChange={this.updateDate("day")} value={this.state.birth_date.day}>
                                    <option disabled="disabled">Day</option> 
                                    {dateSelect(dayArr)}
                                </select>
                                <select onChange={this.updateDate("year")} value={this.state.birth_date.year}>
                                    <option disabled="disabled">Year</option> 
                                    {dateSelect(yearArr)}
                                </select>
                                <button className="signup-msg-btn first" onClick={this.handleMsgOpen("birthdayMsg")} onBlur={this.handleMsgClose}>
                                    <i className="fas fa-question-circle first"></i>
                                </button>
                            </label>
                            <span onMouseDown={this.handleMsgOpen("birthdayMsg")} className={`signup-info-msg-container ${this.state.klass.birthdayMsg}`}>
                                <span class="signup-info-msg-arrow-border" />
                                <span class="signup-info-msg-arrow" />
                                <span className="signup-info-msg">
                                    <p><b>Providing your birthday</b> helps make sure you get the right Facebook experience for your age.</p>
                                </span>
                                <hr />
                                <button onMouseDown={this.handleMsgClose} className="signup-info-close-btn">Close</button>
                            </span>
                            <h2>Gender</h2>
                            <div className="gender-input">
                                <i className={`fas fa-exclamation-circle email ${this.state.klass.genderMsg}`}></i>
                                <input onChange={this.update("gender")} type="radio" id="female" value="F" name="gender" />
                                <label>Female</label>
                                <input onChange={this.update("gender")} type="radio" id="male" value="M" name="gender" />
                                <label>Male</label>
                                <span onMouseDown={this.handleMsgOpen("genderMsg")} className={`signup-info-msg-container second ${this.state.klass.genderMsg}`}>
                                    <span class="signup-info-msg-arrow-border" />
                                    <span class="signup-info-msg-arrow" />
                                    <span className="signup-info-msg">
                                        <p>You can change who sees your gender on your profile later.</p>
                                    </span>
                                    <hr />
                                    <button onMouseDown={this.handleMsgClose} className="signup-info-close-btn">Close</button>
                                </span>
                                <button className="signup-msg-btn" onClick={this.handleMsgOpen("genderMsg")} onBlur={this.handleMsgClose}>
                                    <i className="fas fa-question-circle"></i>
                                </button>
                            </div>
                            <div className="signup-description">
                                <p>
                                    By clicking Sign Up, you are signing up for <a href="#">Pacebook</a>, a Facebook clone project.
                                    Please do not sign up with sensitive information.
                                </p>
                            </div>
                            <button onClick={this.handleSubmit} className="signup-btn">Sign Up</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}