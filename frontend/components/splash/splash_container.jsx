import { connect } from "react-redux";
import Splash from "./splash";

const mapStateToProps = state => ({
    currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);