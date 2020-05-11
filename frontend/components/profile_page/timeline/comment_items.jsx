import React from "react";
import CommentItemContainer from "./comment_item_container";

export default class CommentItems extends React.Component {
    
    render() {
        const comments = this.props.comments.map(comment => {
            return (
                <li key={comment.id}>
                    <CommentItemContainer comment={comment} currentUser={this.props.currentUser} />
                </li>
            )
        });

        return (
            <div className="comment-items">
                <ul>
                    {comments}
                </ul>
            </div>
        )
    }
}