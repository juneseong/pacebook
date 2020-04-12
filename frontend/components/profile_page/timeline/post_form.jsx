import React from "react";

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { body: "", form: "", button: "", buttonColor: "" };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.activatePostForm = this.activatePostForm.bind(this);
        this.deactivatePostForm = this.deactivatePostForm.bind(this);
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
        this.setState({ body: "", buttonColor: "" });
    }

    activatePostForm(e) {
        this.setState({ button: "active" });
    }

    deactivatePostForm(e) {
        this.setState({ button: "" });
    }

    render() {
        return (
            <div className="profile-post-form" onClick={this.activatePostForm} onBlur={this.deactivatePostForm}>
                <div className="post-form-nav">
                    <i className="fas fa-pencil-alt"></i><p>Create Post</p>
                </div>
                
                <form className={this.state.form}>
                    <img src={this.props.currentUser.profile_img} />
                    <textarea placeholder="What's on your mind?" onChange={this.update} value={this.state.body} />
                    <hr />
                    <button className="post-photo-btn">Upload Photo</button>
                    <div className={`post-form-btn-nav ${this.state.button}`}>
                        <button onMouseDown={this.handleSubmit} className={`${this.state.buttonColor}`}>Post</button>
                    </div>
                </form>
                
            </div>
        )
    }
}