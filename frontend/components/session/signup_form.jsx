import React from "react";
import DateSelectItem from "./date_select_item";

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.user,
            klass: { birthdayMsg: "", genderMsg: "", first_name: "", last_name: "", email: "", password: "" },
            emailError: null,
            isFocused: { first_name: null, last_name: null, email: null, password: null }
        };

        this.errors = {
            first_name: "What's your name?",
            last_name: "What's your name?",
            email: "You'll use this when you log in and if you ever need to reset your password.",
            password: "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &)."
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMsgOpen = this.handleMsgOpen.bind(this);
        this.handleMsgClose = this.handleMsgClose.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.errorActive = this.errorActive.bind(this);
        this.isValid = this.isValid.bind(this);

        this.errorRef = {
            first_name: React.createRef(),
            last_name: React.createRef(),
            email: React.createRef(),
            password: React.createRef()
        };
    }

    update(field) {
        return e => {
            if (field === "gender") this.setState({ klass: { ...this.state.klass, genderMsg: "" } });
            this.setState({ [field]: e.currentTarget.value });
        };
    }

    updateDate(field) {
        return e => this.setState({ birth_date: { ...this.state.birth_date, [field]: e.currentTarget.value } });
    }

    handleSubmit(e) {
        e.preventDefault();

        const fields = Object.keys(this.errors);
        const errors = [];
        let valid = true;

        for (let i = 0; i < fields.length; i++) {
            if (this.errorRef[fields[i]].current 
                && !this.isValid(fields[i], this.errorRef[fields[i]].current.value)) {
                valid = false;
                errors.push(fields[i]);
                this.state.klass[fields[i]] = "error-active";
            }
        }

        if (this.state.gender === "") this.state.klass.genderMsg = "error-active";

        const user = Object.assign({}, this.state);
        const { month, day, year } = this.state.birth_date;
        user["birth_date"] = new Date(`${month}-${day}-${year} 00:00:00`);
        this.props.signup(user);
        
        if (!valid) this.errorRef[errors[0]].current.focus();
    }

    handleBlur(input) {
        return e => {
            if (!this.isValid(input, e.currentTarget.value)) {
                this.setState({ isFocused: { ...this.state.isFocused, [input]: false } });
                this.setState({ klass: { ...this.state.klass, [input]: "error-active" } });
            } else {
                this.setState({ klass: { ...this.state.klass, [input]: "" } });
            }
        };
    }

    handleFocus(input) {
        return e => { 
            this.setState({ klass: { ...this.state.klass, [input]: "" } });
            this.setState({ isFocused: { ...this.state.isFocused, [input]: true } });
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

    renderErrorMsg(field) {
        return this.errors[field];
    }

    errorActive(field) {
        const fields = Object.keys(this.errors);

        for (let i = 0; i < fields.length; i++) {
            if (this.errorRef[fields[i]].current 
                && ((field !== "email" && this.props.errors[fields[i]]) || (field === "email" && this.state.emailError))
                && !this.isValid(field, this.errorRef[fields[i]].current.value)
                && this.state.isFocused[field]
                ) {
                    if (field === fields[i]) return "active";
            }
        }
    }

    isValid(field, value) {
        switch (field) {
            case "first_name":
            case "last_name":
            case "gender":
                return value === "" ? false : true;
            case "email":
                const email = value.split("@");
                if (email.length === 2 && email[1].length > 0) {
                    return true;
                } else {
                    this.state.emailError = true;
                    return false;
                }
            case "password":
                return value.length >= 6 ? true : false;
        }
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
                        <h1>Sign Up</h1>
                        <p>It's quick and easy.</p>
                        
                    </div>
                    <div className="signup-form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="name-input">
                                <i className={`fas fa-exclamation-circle first-name ${this.state.klass.first_name}`}></i>
                                <div className={`signup-error-msg-container error-first-name ${this.errorActive("first_name")}`}>
                                    <div className="signup-error-msg-tip"></div>
                                    <div className="signup-error-msg-tip shadow"></div>
                                    <div className="signup-error-msg">{this.renderErrorMsg("first_name")}</div>
                                </div>
                                <input 
                                    className={`name-input-item first ${this.state.klass.first_name}`} 
                                    onFocus={this.handleFocus("first_name")} 
                                    onBlur={this.handleBlur("first_name")} 
                                    onChange={this.update("first_name")} 
                                    type="text" placeholder="First name" 
                                    value={this.state.first_name}
                                    ref={this.errorRef.first_name}>
                                </input>
                                <i className={`fas fa-exclamation-circle last-name ${this.state.klass.last_name}`}></i>
                                <div className={`signup-error-msg-container error-last-name ${this.errorActive("last_name")}`}>
                                    <div className="signup-error-msg-tip last-name"></div>
                                    <div className="signup-error-msg-tip last-name shadow"></div>
                                    <div className="signup-error-msg">{this.renderErrorMsg("last_name")}</div>
                                </div>
                                <input 
                                    className={`name-input-item ${this.state.klass.last_name}`} 
                                    onFocus={this.handleFocus("last_name")} 
                                    onBlur={this.handleBlur("last_name")} 
                                    onChange={this.update("last_name")} 
                                    type="text" placeholder="Last name" 
                                    value={this.state.last_name}
                                    ref={this.errorRef.last_name}>
                                </input>
                            </div>
                            <div className={`signup-error-msg-container error-email ${this.errorActive("email")}`}>
                                <div className="signup-error-msg-tip email"></div>
                                <div className="signup-error-msg-tip email shadow"></div>
                                <div className="signup-error-msg">{this.renderErrorMsg("email")}</div>
                            </div>
                            <i className={`fas fa-exclamation-circle email ${this.state.klass.email}`}></i>
                            <input 
                                className={`name-input-item ${this.state.klass.email}`} 
                                onFocus={this.handleFocus("email")} 
                                onBlur={this.handleBlur("email")} 
                                onChange={this.update("email")} 
                                type="text" 
                                placeholder="Email address" 
                                value={this.state.email}
                                ref={this.errorRef.email}> 
                            </input>
                            <div className={`signup-error-msg-container error-password ${this.errorActive("password")}`}>
                                <div className="signup-error-msg-tip password"></div>
                                <div className="signup-error-msg-tip password shadow"></div>
                                <div className="signup-error-msg">{this.renderErrorMsg("password")}</div>
                            </div>
                            <i className={`fas fa-exclamation-circle email ${this.state.klass.password}`}></i>
                            <input 
                                className={`name-input-item ${this.state.klass.password}`} 
                                onFocus={this.handleFocus("password")} 
                                onBlur={this.handleBlur("password")} 
                                onChange={this.update("password")} 
                                type="password" 
                                placeholder="New password" 
                                value={this.state.password}
                                ref={this.errorRef.password}>
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
                                <span className="signup-info-msg-arrow-border" />
                                <span className="signup-info-msg-arrow" />
                                <span className="signup-info-msg">
                                    <p><b>Providing your birthday</b> helps make sure you get the right Facebook experience for your age.</p>
                                </span>
                                <hr />
                                <button onMouseDown={this.handleMsgClose} className="signup-info-close-btn">Close</button>
                            </span>
                            <h2>Gender</h2>
                            <div className={`signup-error-msg-container error-gender ${this.errorActive("gender")}`}>{this.renderErrorMsg("gender")}</div>
                            <div className="gender-input">
                                <i className={`fas fa-exclamation-circle gender ${this.state.klass.genderMsg}`}></i>
                                <input onChange={this.update("gender")} type="radio" id="female" value="F" name="gender" />
                                <label>Female</label>
                                <input onChange={this.update("gender")} type="radio" id="male" value="M" name="gender" />
                                <label>Male</label>
                                <span onMouseDown={this.handleMsgOpen("genderMsg")} className={`signup-info-msg-container second ${this.state.klass.genderMsg}`}>
                                    <span className="signup-info-msg-arrow-border" />
                                    <span className="signup-info-msg-arrow" />
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
                            <button onClick={this.handleSubmitClick} className="signup-btn">Sign Up</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}