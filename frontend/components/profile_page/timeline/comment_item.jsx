import React from "react";
import { Link } from "react-router-dom";

export default class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        let color = "";
        let weight = "";
        if (props.myLike) {
            color = "#2078F4";
            weight = "bold";
        }
        this.state = { color, weight };
        this.handleDelete = this.handleDelete.bind(this);
        this.renderDeleteBtn = this.renderDeleteBtn.bind(this);
        this.createLike = this.createLike.bind(this);
        this.deleteLike = this.deleteLike.bind(this);
    }

    handleDelete() {
        return this.props.deleteComment(this.props.comment.id);
    }

    renderDeleteBtn() {
        if (this.props.currentUser.id === this.props.comment.user_id) {
            return (
                <>
                    · <span onClick={() => this.handleDelete()} className="like-delete">Delete</span>
                </>
            )
        }
    }

    createLike() {
        let like = {
            like: {
                user_id: this.props.currentUser.id,
                likeable_id: this.props.comment.id,
                emoji_type: "Like",
                likeable_type: "Comment",
            },
        };

        if (this.props.myLike) {
            this.deleteLike();
        } else {
            this.props.createLike(like);
            this.setState({ color: "#2078F4", weight: "bold" })
        }
    }

    deleteLike() {
        let like = {
            like: {
                user_id: this.props.currentUser.id,
                likeable_id: this.props.comment.id,
                emoji_type: "Like",
                likeable_type: "Comment",
                id: this.props.myLike.id
            },
        };

        this.props.deleteLike(like);
        this.setState({ color: "", weight: "" })
    }

    renderLikeCount() {
        if (this.props.comment.like_ids.length > 0) {
            return (
                <div className="comment-like-count">
                    <img src={window.likeSVG} />
                    <div className="comment-like-count-num">{this.props.comment.like_ids.length}</div>
                </div>
            )
        }
    }

    render() {
        let image = window.no_image;

        if (this.props.comment.profile_img && !this.props.comment.profile_img.name) image = this.props.comment.profile_img;

        return (
            <div className="comment-item">
                <div className="comment-item-img">
                    <Link to={`users/${this.props.comment.user_id}`}><img src={image} /></Link>
                </div>
                <div>
                    <div className="comment-item-name-body">
                        <div className="comment-item-name">
                            <Link to={`users/${this.props.comment.user_id}`}>{this.props.comment.first_name} {this.props.comment.last_name}</Link>
                        </div>
                        {this.props.comment.body}
                        <div className="comment-like-count-container">{this.renderLikeCount()}</div>
                    </div>
                    <div className="comment-item-like-delete">
                        <span style={{ color: this.state.color, fontWeight: this.state.weight }} className="like-delete" onClick={() => this.createLike()}>Like</span> {this.renderDeleteBtn()}
                    </div>
                </div>
            </div>
        )
    }
}