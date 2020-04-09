import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { createUser } from "../../actions/users_action";

const mapStateToProps = state => ({
    user: { first_name: "", last_name: "", email: "", password: "", birth_date: { month: "Jan", day: 1, year: 1905 }, gender: "" },
    errors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);