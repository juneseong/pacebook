import React from "react";
import { Link } from "react-router-dom";
import CommentItems from "./comment_items";

export default class PostItems extends React.Component {
  constructor(props) {
    super(props);
    let emojiImg;
    let emojiColor = "";
    if (props.like) {
      switch (props.like.emoji_type) {
        case "Like":
          emojiColor = "#2078F4";
          break;
        case "Love":
          emojiColor = "#F33E58";
          break;
        case "Angry":
          emojiColor = "#E9710F";
          break;
        case "Haha":
        case "Sad":
        case "Wow":
          emojiColor = "#F7B125";
          break;
      }
    }

    if (props.like) {
      if (props.like.emoji_type === "Like") {
        emojiImg = window.likedIcon;
      } else {
        emojiImg = window[props.like.emoji_type.toLowerCase()];
      }
    } else {
      emojiImg = window.likeIcon;
    }
    
    this.state = {
      btnKlass: "",
      editFormKlass: "",
      likeBoxKlass: "",
      emojiImg,
      emojiText: props.like ? props.like.emoji_type : "Like",
      emojiColor,
      likeCount: props.post.like_ids.length > 0 ? props.post.like_ids.length : 0,
      likeClass: props.post.like_ids.length > 0 ? "active" : "",
      commentBody: ""
    };

    this.createLike = this.createLike.bind(this);
    this.deleteLike = this.deleteLike.bind(this);
    this.openLikeBox = this.openLikeBox.bind(this);
    this.closeLikeBox = this.closeLikeBox.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.dropdownOpen = this.dropdownOpen.bind(this);
    this.dropdownClose = this.dropdownClose.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.commentTextarea = React.createRef();
    this.focusCommentTextarea = this.focusCommentTextarea.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCommentItems = this.renderCommentItems.bind(this);
  }

  createLike(emoji) {
    let like = {
      like: {
        user_id: this.props.currentUser.id,
        likeable_id: this.props.post.id,
        emoji_type: emoji,
        likeable_type: "Post",
      },
    };

    if (this.props.like) this.deleteLike(emoji);
    this.props.createLike(like);
  }

  deleteLike(emoji) {
    let like = {
      like: {
        user_id: this.props.currentUser.id,
        likeable_id: this.props.post.id,
        emoji_type: emoji,
        likeable_type: "Post",
        id: this.props.like.id
      },
    };
    
    this.props.deleteLike(like);
  }

  renderLike() {
    return (
      <>
        <img className="like-emoji-img" src={this.state.emojiImg} />
        <p className="like-comment-p" style={{color: this.state.emojiColor}}>
          {this.state.emojiText}
        </p>
      </>
    );
  }

  renderLikeCount() {
    if (this.props.post.like_ids.length > 0) {
      const namesArr = [];
      const emojiArr = [];
      let names;
      let currentUser = false;

      this.props.likes.forEach(like => {
        if (like.user_id === this.props.currentUser.id) {
          currentUser = true;
        } else {
          namesArr.push(`${like.first_name} ${like.last_name}`);
          if (!emojiArr.includes(like.emoji_type)) emojiArr.push(like.emoji_type);
        }
      });

      if (currentUser) {
        const { first_name, last_name } = this.props.currentUser;
        namesArr.push(`${first_name} ${last_name}`);
        if (!emojiArr.includes(this.props.like.emoji_type)) emojiArr.push(this.props.like.emoji_type);
      };

      if (namesArr.length > 2) {
        names = namesArr.reverse()[0] + ` and ${namesArr.length - 1} others`
      } else if (namesArr.length === 2) {
        names = namesArr.reverse().join(" and ");
      } else {
        names = namesArr[0];
      }

      const emojis = emojiArr.reverse().map((emoji, i) => {
        return <img key={i} src={window[emoji.toLowerCase()]}></img>;
      });

      return (
        <div className="liked-list">
          <div className="liked-emoji-list">{emojis}</div>
          <p>{names}</p>
        </div>
      )
    } else {
      return <></>;
    }
  }

  openLikeBox() {
    this.setState({ likeBoxKlass: "active" });
  }

  closeLikeBox() {
    this.setState({ likeBoxKlass: "" });
  }

  handleEmojiClick(emoji) {
    return e => {
      let img;
      switch (emoji) {
        case "Like":
          img = window.likedIcon;
          this.setState({ emojiColor: "#2078F4" });
          break;
        case "Love":
          img = window.love;
          this.setState({ emojiColor: "#F33E58" });
          break;
        case "Haha":
          img = window.haha;
          this.setState({ emojiColor: "#F7B125" });
          break;
        case "Angry":
          img = window.angry;
          this.setState({ emojiColor: "#E9710F" });
          break;
        case "Sad":
          img = window.sad;
          this.setState({ emojiColor: "#F7B125" });
          break;
        case "Wow":
          img = window.wow;
          this.setState({ emojiColor: "#F7B125" });
          break;
      }
      
      if (e.currentTarget.className === "post-like") {

        if (this.props.like) {
          this.setState({ emojiImg: window.likeIcon, emojiText: "Like" });
          this.deleteLike(emoji);
          this.setState({ emojiColor: "" });
        } else {
          this.setState({ emojiImg: img, emojiText: emoji });
          this.createLike(emoji);
        }
      } else {
        this.setState({ emojiImg: img, emojiText: emoji });
        this.createLike(emoji);
      }
    }
  }

  deletePost(postId) {
    return (e) => {
      this.props.deletePost(postId);
      this.dropdownClose(e);
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

  focusCommentTextarea() {
    this.commentTextarea.current.focus();
  }

  update(e) {
    this.setState({ commentBody: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = {
      comment: {
        body: this.state.commentBody,
      }
    }

    this.props.createComment(this.props.post.id, comment);
    this.setState({ commentBody: "" });
  }

  renderCommentItems() {
    if (this.props.comments.length > 0) {
      return <CommentItems comments={this.props.comments} currentUser={this.props.currentUser} />;
    }
  }

  renderReceiverName() {
    if (this.props.post.user_id !== this.props.post.receiver_id) {

      const first_name = this.props.receiver.first_name;
      const last_name = this.props.receiver.last_name;
      const link = `/users/${this.props.receiver.id}`;

      return (
        <>
          <i className="fas fa-play"></i>
          <Link to={link}>
            <p className="post-name-p">
              {first_name} {last_name}
            </p>
          </Link>
        </>
      )
    }
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
            <div className="post-item-profile-img">
              <img src={`${image}`} />
            </div>
          </Link>
          <div className="post-name-date">
            <div className="post-names">
              <Link to={link}>
                <p className="post-name-p">
                  {first_name} {last_name}
                </p>
              </Link>
              {this.renderReceiverName()}
            </div>
            <p className="post-date-p">{this.props.post.created_at}</p>
          </div>
        </div>
        <p className={"post-body"}>{this.props.post.body}</p>
        {this.renderLikeCount()}
        <hr />
        <div
          className={`like-box ${this.state.likeBoxKlass}`}
          onMouseOver={this.openLikeBox}
          onMouseOut={this.closeLikeBox}
        >
          <img src={window.like} onClick={this.handleEmojiClick("Like")} />
          <img src={window.love} onClick={this.handleEmojiClick("Love")} />
          <img src={window.haha} onClick={this.handleEmojiClick("Haha")} />
          <img src={window.angry} onClick={this.handleEmojiClick("Angry")} />
          <img src={window.sad} onClick={this.handleEmojiClick("Sad")} />
          <img src={window.wow} onClick={this.handleEmojiClick("Wow")} />
        </div>
        <div className="post-like-comment">
          <span
            className="post-like"
            onMouseOver={this.openLikeBox}
            onMouseOut={this.closeLikeBox}
            onClick={this.handleEmojiClick("Like")}
          >
            <span className="like-span">
              {this.renderLike()}
            </span>
          </span>
          <span className="post-comment" onClick={this.focusCommentTextarea}>
            <span className="comment-span">
              <p><i className="far fa-comment-alt"></i></p>
              <p className="like-comment-p">
                Comment
              </p>
            </span>
          </span>
        </div>
        <hr />
        {comments}
        {this.renderCommentItems()}
        <div className="post-comment-box">
          <div className="post-comment-box-img">
            <Link to={currentLink}>
              <img src={currentImg} />
            </Link>
          </div>
          <div className="post-comment-box-msg">
            <textarea 
              ref={this.commentTextarea} 
              placeholder="Write a comment..." 
              value={this.state.commentBody} 
              onChange={this.update} 
              onKeyDown={e => {if (e.key === "Enter") this.handleSubmit(e);}}
            />
            <p className="comment-msg-p">Press Enter to post.</p>
          </div>
        </div>
      </div>
    );
  }
}