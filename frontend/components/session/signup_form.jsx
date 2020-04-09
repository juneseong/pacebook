import React from "react";
import DateSelectItem from "./date_select_item";

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
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

    renderErrors() {
        const klass = this.props.errors.length > 0 ? "active" : "";

        const errors = this.props.errors.map((error, i) => {
            return (
                <li key={i} className={`signup-error-msg ${klass}`}>{error}</li>
            )
        });

        const error = errors.slice(0, 1);

        return (
            <div className="signup-error-msg-container">
                <ul>
                    {error}
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
                        <form onSubmit={this.handleSubmit} >
                            <div className="name-input">
                                <input onChange={this.update("first_name")} type="text" placeholder="First name" value={this.state.first_name} />
                                <input onChange={this.update("last_name")} type="text" placeholder="Last name" value={this.state.last_name} />
                            </div>
                            <input onChange={this.update("email")} type="email" placeholder="Email address" value={this.state.email} />
                            <input onChange={this.update("password")} type="password" placeholder="New password" value={this.state.password} />
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
                            </label>
                            <h2>Gender</h2>
                            <div className="gender-input">
                                <input onChange={this.update("gender")} type="radio" id="female" value="F" name="gender" />
                                <label>Female</label>
                                <input onChange={this.update("gender")} type="radio" id="male" value="M" name="gender" />
                                <label>Male</label>
                            </div>
                            <div className="signup-description">
                                By clicking Sign Up, you are signing up for <a href="#">Pacebook</a>, a Facebook clone project.
                                Please do not sign up with sensitive information.
                            </div>
                            <button>Sign Up</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}