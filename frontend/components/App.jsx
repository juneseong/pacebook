import React from "react";
import { Route } from "react-router-dom";
import SplashContainer from "./splash/splash_container";
import HeaderContainer from "./header/header_container";
import ProfilePageContainer from "./profile_page/profile_page_container";

const App = () => (
    <>
        <HeaderContainer />
        <Route exact path="/" component={SplashContainer} />
        <Route path="/users/:userId" component={ProfilePageContainer} />
    </>
)

export default App;