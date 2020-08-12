import React from "react";
import PostItemsContainer from "./post_items_container";
import PostFormContainer from "./post_form_container";
import WithSpinner from "../../with_spinner/with_spinner";

export default class Posts extends React.Component {
    render() {
        let posts;

        if (this.props.posts.length > 0 && this.props.posts[0] !== undefined) {
            posts = this.props.posts.map((post, i) => {
                if (post) {
                    return (
                        <PostItemsContainer key={post.id} id={post.id} post={post} posts={this.props.posts} currentUser={this.props.currentUser} users={this.props.users}>
                        </PostItemsContainer>
                    );
                }
            })
        } else {
            posts = <WithSpinner />;
        }
        
        return (
            <>
                <PostFormContainer user={this.props.user} currentUser={this.props.currentUser} />
                <div className="profile-posts">
                {posts}
                </div>
            </>
        )
    }
}