import React from "react";

const languages = ["English(US)", "Español", "Français(France)", "中文(简体)", "العربية", "Português(Brasil)", "Italiano", "한국어", "Deutsch", "हिन्दी", "日本語"];
const menus = ["Sign Up", "Log In", "Messenger", "Facebook Lite", "Watch", "People", "Pages", "Page Categories", "Places", "Games", "Locations", "Marketplace", "Groups", "Instagram"];

const Footer = () => {
    const langLi = languages.map((lang, i) => (
        <li key={i}>
            <a href="#">{lang}</a>
        </li>
    ));

    const menuLi = menus.map((menu, i) => (
        <li key={i}>
            <a href="#">{menu}</a>
        </li>
    ));

    return (
        <div className="footer-container">
            <div className="footer">
                <ul>
                    {langLi}
                </ul>
                <hr />
                <ul>
                    {menuLi}
                </ul>
                <p>June © 2020</p>
            </div>
        </div>
    )
}

export default Footer;