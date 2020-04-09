import { connect } from "react-redux";
import Header from "./header";

const mapStateToProps = state => ({
    currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);