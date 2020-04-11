import React from "react";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (e.currentTarget.innerHTML === "Demo") {
            const demoUser = {
                email: "jyjseong@gmail.com",
                password: "123456"
            };

            this.props.login(demoUser);
        } else {
            this.props.login(this.state);
        }
    }

    renderErrors() {
        const errors = this.props.errors.map((error, i) => {
            return (
                <li key={i}>{error}</li>
            )
        });

        return (
            <>
                <ul>
                    {errors}
                </ul>
            </>
        )
    }

    render() {
        const klass = this.props.errors.length > 0 ? "active" : "";

        return (
            <nav className="login-form-nav">
                <div className="login-form">
                    <div className="logo"><h1><Link to="/">pacebook</Link></h1></div>
                        <form>
                            <div className={`login-error-msg ${klass}`}>
                                {this.renderErrors()}
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input onChange={this.update("email")} type="text" value={this.state.email} /></td>
                                        <td><input onChange={this.update("password")} type="password" value={this.state.password} /></td>
                                        <td>
                                            <button onClick={this.handleSubmit}>Log In</button>
                                            <button onClick={this.handleSubmit}>Demo</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                </div>
            </nav>
        )
    }
}