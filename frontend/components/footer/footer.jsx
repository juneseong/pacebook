import React from "react";

const websites = ["Portfolio", "LinkedIn", "Github", "AngelList"];

const Footer = () => {
    const data = websites.map((website, i) => (
        <li key={i}>
            <a href="#">{website}</a>
        </li>
    ));

    return (
        <div className="footer-container">
            <div className="footer">
                <ul>
                    {data}
                </ul>
                <hr />
                <p>June © 2020</p>
            </div>
        </div>
    )
}

export default Footer;