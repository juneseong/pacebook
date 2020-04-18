import React from "react";
import { Link } from "react-router-dom";
import CommentItems from "./comment_items";

export default class PostItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnKlass: "",
      editFormKlass: "",
      likeBoxKlass: "",
      deleted: null,
      emoji: "",
      like: "",
      love: "",
      haha: "",
      angry: "",
      sad: "",
      wow: "",
      likeCounts: this.props.post.likes ? Object.keys(this.props.post.likes).length : 0,
      likeClass: this.props.post.likes ? "active" : "",
      liked: null
    };

    this.createLike = this.createLike.bind(this);
    this.deleteLike = this.deleteLike.bind(this);
    this.openLikeBox = this.openLikeBox.bind(this);
    this.closeLikeBox = this.closeLikeBox.bind(this);
    this.dropdownOpen = this.dropdownOpen.bind(this);
    this.dropdownClose = this.dropdownClose.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    if (this.props.post.likes && this.props.post.likes[this.props.currentUser.id]) {
      this.setState({ liked: this.deleteLike });
    } else {
      this.setState({ liked: this.createLike });
    }
  }


  createLike() {
        let like = {
          like: {
            user_id: this.props.currentUser.id,
            likeable_id: this.props.post.id,
            emoji_type: "like",
            likeable_type: "Post",
          },
        };

        this.props.createLike(like);
    this.setState({ likeCounts: Object.keys(this.props.post.likes).length + 1, liked: this.deleteLike });
  }

  deleteLike() {
    let like = {
      like: {
        user_id: this.props.currentUser.id,
        likeable_id: this.props.post.id,
        emoji_type: "like",
        likeable_type: "Post",
        id: this.props.post.likes[this.props.currentUser.id].id
      },
    };

    this.props.deleteLike(like);
    this.setState({ likeCounts: Object.keys(this.props.post.likes).length - 1, liked: this.createLike });
  }

  openLikeBox() {
    this.setState({ likeBoxKlass: "active" });
  }

  closeLikeBox() {
    this.setState({ likeBoxKlass: "" });
  }

  deletePost(postId) {
    return (e) => {
      this.props.deletePost(postId);
    };
  }

  openEditModal(e) {
    this.setState({ editFormKlass: "active-modal" });
  }

  closeEditModal() {
    this.setState({ editFormKlass: "" });
  }

  dropdownOpen(e) {
    e.preventDefault();
    this.setState({ btnKlass: "dropdown-active" });
  }

  dropdownClose(e) {
    this.setState({ btnKlass: "" });
  }

  render() {
    if (!this.props.post) return null;

    let first_name = "";
    let last_name = "";
    let image = window.no_image;
    let currentImg = window.no_image;
    let link = "";
    let currentLink = "";
    let editBtnClass = "";
    let comments = "";

    if (this.props.currentUser) {
      if (!this.props.currentUser.profile_img.name)
        currentImg = this.props.currentUser.profile_img;
      link = `/users/${this.props.currentUser.id}`;
    }

    if (this.props.user) {
      if (!this.props.user.profile_img.name)
        image = this.props.user.profile_img;

      first_name = this.props.user.first_name;
      last_name = this.props.user.last_name;
      link = `/users/${this.props.user.id}`;
    }

    if (this.props.post.user_id === this.props.currentUser.id)
      editBtnClass = "active";

    return (
      <div className="profile-post-items">
        <div className="post-img-name-date">
          <div className="post-edit-delete-btn-div">
            <button
              className={`post-edit-delete-btn ${editBtnClass}`}
              onClick={this.dropdownOpen}
              onBlur={this.dropdownClose}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div
              className={`post-edit-delete-dropdown ${this.state.btnKlass}`}
              onMouseDown={this.dropdownOpen}
            >
              <ul>
                <li onClick={this.deletePost(this.props.post.id)}>
                  <p>Delete post</p>
                </li>
              </ul>
            </div>
          </div>
          <Link to={link}>
            <img src={`${image}`} />
          </Link>
          <div className="post-name-date">
            <Link to={link}>
              <p className="post-name-p">
                {first_name} {last_name}
              </p>
            </Link>
            <p className="post-date-p">{this.props.post.created_at}</p>
          </div>
        </div>
        <p className={"post-body"}>{this.props.post.body}</p>
        {/* <p className={`like-counts ${this.state.likeClass}`}>{this.state.likeCounts} likes</p> */}
        <hr />
        <div
          className={`like-box ${this.state.likeBoxKlass}`}
          onMouseOver={this.openLikeBox}
          onMouseOut={this.closeLikeBox}
        >
          <img src={window.like} />
          <img src={window.love} />
          <img src={window.haha} />
          <img src={window.angry} />
          <img src={window.sad} />
          <img src={window.wow} />
        </div>
        <div className="post-like-comment">
          <span
            className="post-like"
            // onClick={this.state.liked}
            onMouseOver={this.openLikeBox}
            onMouseOut={this.closeLikeBox}
          >
            <p className="like-comment-p">
              <i className="far fa-thumbs-up"></i>Like
            </p>
          </span>
          <span className="post-comment">
            <p className="like-comment-p">
              <i className="far fa-comment-alt"></i>Comment
            </p>
          </span>
        </div>
        <hr />
        {comments}
        <div className="post-comment-box">
          <Link to={currentLink}>
            <img src={currentImg} />
          </Link>
          <div className="post-comment-box-msg">
            <textarea placeholder="Write a comment..." />
            <p className="comment-msg-p">Press Enter to post.</p>
          </div>
        </div>
      </div>
    );
  }
}
