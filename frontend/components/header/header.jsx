import React from "react";
import LoginFormContainer from "../session/login_form_container";
import TopNavContainer from "./top_nav_container";

const Header = props => {
        let Result;
   
        if (props.currentUser) {
            Result = () => (
                <>
                    <TopNavContainer />
                </>
            );
        } else {
            Result = () => (
                <>
                    <LoginFormContainer />
                </>
            );
        }

        return (
            <>
                <Result />
            </>
        );
};

export default Header;