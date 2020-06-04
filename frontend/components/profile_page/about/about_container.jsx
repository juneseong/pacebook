import { connect } from "react-redux";
import About from "./about";
import { updateUser } from "../../../actions/users_action";

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, formData) => dispatch(updateUser(userId, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);