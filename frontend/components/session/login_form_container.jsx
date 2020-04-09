import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login } from "../../actions/session_action";

const mapStateToProps = state => ({
    user: { email: "", password: "" },
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);