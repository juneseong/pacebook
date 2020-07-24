import React from "react";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "", form: "", button: "", buttonColor: "", imageUrl: null, imageFile: null };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusTextarea = this.focusTextarea.bind(this);
    this.activatePostForm = this.activatePostForm.bind(this);
    this.deactivatePostForm = this.deactivatePostForm.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.deleteImg = this.deleteImg.bind(this);

    this.textarea = React.createRef();
    this.modal = React.createRef();
    this.image = React.createRef();
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

    if (this.state.buttonColor !== "") {
      const formData = new FormData();
      if (this.state.imageFile) formData.append("post[img]", this.state.imageFile);

      const body = this.state.body;
      formData.append("post[body]", body);
      formData.append("post[receiver_id]", this.props.user.id);

      this.props.createPost(this.props.currentUser.id, formData);
      this.modal.current.click();
      this.setState({ body: "", buttonColor: "", imageUrl: null, imageFile: null });
    }
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

  uploadImg(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file }, () => {
    });

    if (file) {
      reader.readAsDataURL(file);
      this.setState({ buttonColor: "add-color" });
    }
  }

  deleteImg() {
    if (this.state.body === "") this.setState({ buttonColor: "" });
    this.setState({ imageUrl: null, imageFile: null });
    this.image.current.value = "";
  }

  render() {

    const profileImg = this.props.currentUser.profile_img.name ? window.no_image : this.props.currentUser.profile_img;

    return (
      <>
        <div
          ref={this.modal}
          className={"modal-bg " + this.state.button}
          onClick={this.handleModalClick}
        />
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
                placeholder={this.state.imageFile ? "Say something about this photo..." : `What's on your mind, ${this.props.currentUser.first_name}?`}
                onChange={this.update}
                onFocus={this.focusTextarea}
                value={this.state.body}
              />
              {this.state.button === "active" && this.state.imageUrl
                ? <div className="post-upload-img-container">
                    <div className="post-upload-img">
                      <div className="background" />
                      <i className="fas fa-times" onClick={this.deleteImg}></i>
                      <img src={this.state.imageUrl} />
                    </div>
                  </div>
                : null}
              <div className="hr" />
              <div className="post-photo-btn">
                Upload Photo
                <input 
                  type="file" 
                  title="" 
                  onChange={this.uploadImg}
                  ref={this.image}
                />
              </div>
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
