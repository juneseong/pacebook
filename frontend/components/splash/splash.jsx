import React from "react";
import SignupFormContainer from "../session/signup_form_container";
import Greeting from "./greeting.jsx";
import NewsfeedContainer from "../newsfeed/newsfeed_container";
import Footer from "../footer/footer"; 

export default class Splash extends React.Component {    
    render() {
        let Result;
        
        if (this.props.currentUser) {
            Result = () => (
                <>
                    <NewsfeedContainer />
                </>
            );
        } else {
            Result = () => (
                <>
                    <div className="main-container">
                        <div className="greeting-container">
                            <Greeting />
                            <SignupFormContainer />
                        </div>
                    </div>
                    <Footer />
                </>
            );
        }

        return (
            <>
                <Result />
            </>
        )
    };
};