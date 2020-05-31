import React from "react";
import PostItemsContainer from "../profile_page/timeline/post_items_container";
import PostFormContainer from "../profile_page/timeline/post_form_container";
import { Link } from "react-router-dom";

export default class Newsfeed extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAllPosts();
    }

    render() {
        let posts;

        if (this.props.posts.length > 0) {
            posts = this.props.posts.map(post => 
                <PostItemsContainer
                    key={post.id}
                    post={post}
                    posts={this.props.posts}
                    currentUser={this.props.currentUser}
                />
            );
        } else {
            posts = <></>;
        }

        return (
            <div className="newsfeed-container">
                <div className="newsfeed-left">
                    <p className="p-header name"><b>{this.props.currentUser.first_name.toUpperCase()} {this.props.currentUser.last_name.toUpperCase()}</b></p>
                    <ul>
                        <li className="newsfeed-li">
                            <img src="https://img.icons8.com/color/48/000000/pin3.png" />
                            <h3><b>News Feed</b></h3>
                        </li>
                        <a href="https://juneseong.com" target="_blank">
                            <li className="portfolio-li">
                                <img src="https://img.icons8.com/color/48/000000/folder-invoices.png" />
                                <h3>Portfolio</h3>
                            </li>
                        </a>
                    </ul>
                    <p className="p-header"><b>Explore</b></p>
                    <ul className="newsfeed-ul">
                        <a href="https://github.com/juneseong" target="_blank">
                            <li>
                                <img src="https://img.icons8.com/ios-filled/64/000000/github.png" />
                                <h3>Github</h3>
                            </li>
                        </a>
                        <a href="https://www.linkedin.com/in/juneseong" target="_blank">
                            <li>
                                <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" />
                                <h3>LinkedIn</h3>
                            </li>
                        </a>
                        <a href="https://angel.co/u/june-seong" target="_blank">
                            <li>
                                <img src="https://img.icons8.com/ios/50/000000/angelist.png" />
                                <h3>AngelList</h3>
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="newsfeed-post-container">
                    <PostFormContainer user={this.props.currentUser} currentUser={this.props.currentUser} />
                    <div className="newsfeed-posts">
                        {posts}
                    </div>
                </div>
                <div className="newsfeed-right">
                    <div className="newsfeed-right-content">
                        <ul>
                            <li>
                                <img src="https://img.icons8.com/color/48/000000/birthday.png" />
                                <Link to="/users/72"><p className="p-blue">June Seong</p></Link><p>'s birthday is today</p>
                            </li>
                        </ul>
                    </div>
                    <div className="newsfeed-right-ad">
                        <nav>
                            <p>Sponsored</p>
                        </nav>
                        <nav className="app-ad-body">
                            <a href="https://www.appacademy.io" target="_blank"><p className="p-blue">App Academy</p></a>
                            <p>Software training institute</p>
                            <nav className="app-ad-flex">
                                <nav className="ad-logo">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Appacademylogo.png" />
                                </nav>
                                <nav className="app-ad-text">
                                    <p>
                                        The Top Ranked Code Bootcamp By Employers.
                                        Free Until You're Hired As A Developer.
                                        Learn Full-Stack Development In 16 Weeks.
                                    </p>
                                </nav>
                            </nav>
                        </nav>
                    </div>
                    <p className="p-footer">June © 2020</p>
                </div>
            </div>
        )
    }
}