import React from "react";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "", form: "", button: "", buttonColor: "" };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusTextarea = this.focusTextarea.bind(this);
    this.activatePostForm = this.activatePostForm.bind(this);
    this.deactivatePostForm = this.deactivatePostForm.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.textarea = React.createRef();
    this.modal = React.createRef();
  }

  update(e) {
    if (e.currentTarget.value === "") {
      this.setState({ buttonColor: "" });
    } else {
      this.setState({ buttonColor: "add-color" });
    }

    this.setState({ body: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const postData = Object.assign({}, this.state);
    this.props.createPost(this.props.currentUser.id, { post: { body: postData.body, receiver_id: this.props.user.id } });
    this.modal.current.click();
    this.setState({ body: "", buttonColor: "" });
  }

  focusTextarea(e) {
    this.setState({ button: "active" });
  }

  activatePostForm(e) {
    if (e.target !== this.textarea.current) {
      this.textarea.current.focus();
    }
  }

  deactivatePostForm(e) {
    this.setState({ button: "" });
  }

  handleModalClick(e) {
    this.deactivatePostForm();
  }

  render() {

    const profileImg = this.props.currentUser.profile_img.name ? window.no_image : this.props.currentUser.profile_img;

    return (
      <>
        <div
          ref={this.modal}
          className={"modal-bg " + this.state.button}
          onClick={this.handleModalClick}
        ></div>
        <div className={`profile-post-form-container ${this.state.button}`}>
          <div className={"post-form-close-btn " + this.state.button} onMouseDown={this.deactivatePostForm}>
            <i className="fas fa-times"></i>
          </div>
          <div
            className="profile-post-form"
            onClick={this.activatePostForm}
          >
            <div className="post-form-nav">
              <i className="fas fa-pencil-alt"></i>
              <p>Create Post</p>
            </div>
            <form className={this.state.form}>
              <div className="post-form-profile-img">
                <img src={profileImg} />
              </div>
              <textarea
                ref={this.textarea}
                placeholder={`What's on your mind, ${this.props.currentUser.first_name}?`}
                onChange={this.update}
                onFocus={this.focusTextarea}
                value={this.state.body}
              />
              <hr />
              <button className="post-photo-btn">Upload Photo</button>
              <div className={`post-form-btn-nav ${this.state.button}`}>
                <button
                  onClick={this.handleSubmit}
                  className={this.state.buttonColor}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
