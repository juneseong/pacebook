import React from "react";

const Greeting = () => (
    <div className="greeting">
        <h1>Keep up the pace with your friends' lives online.</h1>
        <div className="greeting-description">
            <i className="material-icons">filter</i>
            <h2>See photos and updates</h2> <p>from friends in News Feed.</p>
        </div>
        <div className="greeting-description">
            <i className="material-icons">search</i>
            <h2>Share what's new</h2> <p>in your life on your Timeline.</p>
        </div>
        <div className="greeting-description">
            <i className="material-icons">share</i>
            <h2>Find more</h2> <p>of what you're looking for with Facebook Search.</p>
        </div>
    </div>
)

export default Greeting;