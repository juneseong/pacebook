import React from "react";
import LoginFormContainer from "../session/login_form_container";
import TopNavContainer from "./top_nav_container";

const Header = props => {
        let TopNav;
   
        if (props.currentUser) {
            TopNav = () => (
                <>
                    <TopNavContainer />
                </>
            );
        } else {
            TopNav = () => (
                <>
                    <LoginFormContainer />
                </>
            );
        }

        return (
            <>
                <TopNav />
            </>
        );
};

export default Header;