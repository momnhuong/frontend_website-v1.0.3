import React, { Component } from "react";
import "./style.css";
import AvatarBox from "../AvatarBox";

class AboutProfileBox extends Component {
  _onPopUp = () => {
    this.props.onPopup();
  };
  render() {
    return (
      <div className="profile-owner">
        <div className="close-box" onClick={() => this._onPopUp()}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="profile-owner-box">
          <div className="owner-avatar">
            <AvatarBox img={this.props.avatar} />
            <p className="owner-name">{this.props.title}</p>
          </div>
          <div className="owner-about">
            <p>About</p>
            <textarea
              placeholder={"About user"}
              defaultValue={
                "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow."
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutProfileBox;
