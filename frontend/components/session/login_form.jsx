import React from "react";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.user,
            focused: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.errorRef = {
            email: React.createRef(),
            password: React.createRef()
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

        this.errorRef.email.current.focus();
    }

    handleFocus() {
        this.setState({ focused: true });
    }

    handleBlur() {
        this.setState({ focused: false });
    }

    errorActive() {
        if (this.props.errors.length > 0 && this.state.focused) {
            return "active";
        } else {
            return "";
        }
    }

    render() {
        const errors = this.props.errors.map((error, i) => {
            return (
                <li key={i}>{error}</li>
            )
        });

        return (
            <nav className="login-form-nav">
                <div className="login-form">
                    <div className="logo"><h1><Link to="/">pacebook</Link></h1></div>
                        <form>
                            <div className={`login-error-msg ${this.errorActive()}`}>
                                <div className="signup-error-msg-tip login"></div>
                                <div className="signup-error-msg-tip login shadow"></div>
                                <ul>
                                    {errors}
                                </ul>    
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
                                        <td><input onFocus={this.handleFocus} onBlur={this.handleBlur} ref={this.errorRef.email} onChange={this.update("email")} type="text" value={this.state.email} /></td>
                                        <td><input onFocus={this.handleFocus} onBlur={this.handleBlur} ref={this.errorRef.password} onChange={this.update("password")} type="password" value={this.state.password} /></td>
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