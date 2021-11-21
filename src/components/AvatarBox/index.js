import React, { Component } from "react";
import "./style.css";
import { IMAGES } from "../../assets";

class AvatarBox extends Component {
  render() {
    return (
      <div className="avatar-box">
        <div className="user-avatar">
          <img src={this.props.img} className="img-avatar" alt="icon-user" />
        </div>
      </div>
    );
  }
}

export default AvatarBox;
