import React from "react";
import Timeline from "./timeline/timeline";
import About from "./about";
import FriendsContainer from "./friends_container";
import Photos from "./photos";
import { Link, Route } from "react-router-dom";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: "", imageFile: null, data: null, friendMenu: "" };
    this.uploadImg = this.uploadImg.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.acceptFriend = this.acceptFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.userId) this.props.fetchPosts(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.props.fetchPosts(this.props.match.params.userId);
    }
  }

  uploadImg(e) {
    const image = e.currentTarget.classList.value === "profile-img-upload" ? "user[profile_img]" : "user[cover_img]";
    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file }, () => {
        const formData = new FormData();
        if (this.state.imageFile) formData.append(image, this.state.imageFile);
        this.props.updateUser(this.props.currentUser.id, formData);
      });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  renderFriendButton() {
    if (this.props.currentUser && this.props.currentUser.id !== this.props.user.id) {
      if ((this.props.requestSent && this.props.requestSent.status) || (this.props.requestReceived && this.props.requestReceived.status)) {
        return (
          <>
            <div className="friend-btn">
              <button onClick={() => this.setState({ friendMenu: "active" })} onBlur={() => this.setState({ friendMenu: "" })}><i className="fas fa-check"></i>Friends</button>
            </div>
            <div className={`friend-menu ${this.state.friendMenu}`}>
              <ul>
                <li onMouseDown={this.deleteFriend}><p>Unfriend</p></li>
              </ul>
              <div className="friend-menu-tip"></div>
              <div className="friend-menu-tip-border"></div>
            </div>
          </>
        )
      } else if (this.props.requestSent && !this.props.requestSent.status) {
        return (
          <>
            <div className={`friend-menu ${this.state.friendMenu}`}>
              <ul>
                <li onMouseDown={this.deleteFriend}><p>Cancel Request</p></li>
              </ul>
              <div className="friend-menu-tip"></div>
              <div className="friend-menu-tip-border"></div>
            </div>
            <div className="friend-btn">
              <button onClick={() => this.setState({ friendMenu: "active" })} onBlur={() => this.setState({ friendMenu: "" })}><i className="fas fa-user-check"></i>Friend Request Sent</button>
            </div>       
          </>
        )
      } else if (this.props.requestReceived && !this.props.requestReceived.status) {
        return (
          <>
            <div className="friend-btn">
              <button onClick={() => this.setState({ friendMenu: "active" })} onBlur={() => this.setState({ friendMenu: "" })}><i className="fas fa-user-plus"></i>Respond to Friend Request</button>
            </div>
            <div className={`friend-menu ${this.state.friendMenu}`}>
              <ul>
                <li onMouseDown={() => this.acceptFriend(this.props.requestReceived)}><p>Confirm</p></li>
                <li onMouseDown={this.deleteFriend}><p>Delete Request</p></li>
              </ul>
              <div className="friend-menu-tip"></div>
              <div className="friend-menu-tip-border"></div>
            </div>
          </>
        )
      } else {
        return (
          <div className="friend-btn">
            <button onClick={this.addFriend}><i className="fas fa-user-plus"></i>Add Friend</button>
          </div>
        )
      }
    }
  }

  addFriend() {
    const friendship = { requestee_id: this.props.user.id, requester_id: this.props.currentUser.id };
    this.props.addFriend(friendship);
  }

  acceptFriend(friendship) {
    this.props.acceptFriend({ id: friendship.id });
  }
  
  deleteFriend() {
    const friendship = { requestee_id: this.props.user.id };
    this.props.deleteFriend(friendship);
  }

  render() {
    let fullName, EditProfilePhoto, EditCoverPhoto, coverBackgroundImg, profileBackgroundImg;
    const { user, currentUser } = this.props;

    const ProfileNavLink = !currentUser ? () => <></> : () => (
      <Link to={`/users/${user.id}`}>
        <li>
          <p>Timeline</p>
        </li>
      </Link>
    );

    const TimelineRoute = !currentUser ? () => <></> : () => (
      <Route exact path="/users/:userId" render={() => <Timeline user={user} currentUser={currentUser} refresh={this.refreshPosts} updateUser={this.props.updateUser} friends={this.props.friends} />} />
    );

    const AboutRoute = !currentUser ? () => (
      <Route exact path={["/users/:userId", "/users/:userId/about"]} component={() => <About user={user} currentUser={currentUser} />} />
    ) : () => <Route path="/users/:userId/about" component={() => <About user={user} currentUser={currentUser} />} />;

    if (user.email) {
      coverBackgroundImg = user.cover_img.name ? {} : { backgroundImage: "url(" + user.cover_img + ")" };
      profileBackgroundImg = user.profile_img.name ? window.no_image : user.profile_img;

      fullName = `${user.first_name} ${user.last_name}`;

      if (currentUser && currentUser.id === user.id) {
        if (currentUser.cover_img.name) {
          EditCoverPhoto = () => (
              <div className="add-cover-photo-text add">
                  <i className="fas fa-camera">
                      <input className="cover-img-upload" type="file" onChange={this.uploadImg} />
                  </i>
              </div>
          );
        } else {
          EditCoverPhoto = () => (
            <div className="add-cover-photo-text edit">           
              <i className="fas fa-camera">
                  <input className="cover-img-upload" type="file" onChange={this.uploadImg} />
              </i>
            </div>
          );
        }
        if (currentUser.profile_img.name) {
          EditProfilePhoto = () => (
            <div className="half-circle">
              <div className="add-photo-text add">
                <i className="fas fa-camera"></i>
                <br />
                <p>Add Photo</p>
                <input className="profile-img-upload" type="file" onChange={this.uploadImg} />
              </div>
              <div className="half-circle-left"></div>
              <div className="half-circle-right"></div>
            </div>
          );   
        } else {
          EditProfilePhoto = () => (
            <div className={"half-circle edit"}>
              <div className="add-photo-text edit">
                <i className="fas fa-camera"></i>
                <br />
                <p><b>Update</b></p>
                <input className="profile-img-upload" type="file" onChange={this.uploadImg} />
              </div>
              <div className="half-circle-left"></div>
              <div className="half-circle-right"></div>
            </div>
          );       
        }
      } else {
        EditProfilePhoto = () => <></>;
        EditCoverPhoto = () => <></>;
      }
    } else {
      fullName = "";

      EditProfilePhoto = () => <></>;
      EditCoverPhoto = () => <></>;

      coverBackgroundImg = {};
      profileBackgroundImg = window.no_image;
    }

    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="cover-photo-container" style={ coverBackgroundImg }>
          <EditCoverPhoto />
          <div className="profile-photo-container" style={{ backgroundImage: `url(${profileBackgroundImg})` }}>
            <EditProfilePhoto />
          </div>
          {this.renderFriendButton()}
          <h2 className="profile-name">
              <Link to={`/users/${user.id}`}>{fullName}</Link>
          </h2>
        </div>
        <div className="profile-nav">
          <ul>
            <ProfileNavLink />
            <Link to={`/users/${user.id}/about`}>
              <li>
                <p>About</p>
              </li>
            </Link>
            <Link to={`/users/${user.id}/friends`}>
              <li>
                <p>Friends</p>
              </li>
            </Link>
            <Link to={`/users/${user.id}/photos`}>
              <li className="profile-nav-last-li">
                <p>Photos</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="profile-body">
        <TimelineRoute />
        <AboutRoute />
        <Route path="/users/:userId/friends" render={() => <FriendsContainer user={this.props.user} currentUser={this.props.currentUser} friends={this.props.friends} />} />
        <Route path="/users/:userId/photos" render={() => <Photos />} />
        </div>
      </div>
    );
  }
}
