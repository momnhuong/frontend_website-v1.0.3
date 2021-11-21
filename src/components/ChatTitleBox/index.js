import React, { Component } from "react";
import "./style.css";
import AvatarBox from "../AvatarBox";
import { detail_chat } from "../../features/chat/services";
import { connect } from "react-redux";

class ChatTitleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChat: 1,
    };
  }

  _onClickChat = (data, id) => {
    this.props.onHandleClick(this.props.id);
    this.props.dpDetailChat(data, id);
  };

  render() {
    const { id, title, description, time, activeChat, avatar } = this.props;
    const detailChat = {
      id,
      title,
      description,
      time,
      avatar,
    };
    return (
      <div
        className={`chat-title-box ${activeChat === id ? "active" : ""}`}
        onClick={() => this._onClickChat(detailChat, id)}
      >
        <AvatarBox img={avatar} />
        <div className="title-box">
          <div className="title-box-info">
            <p className="info-name">{title}</p>
            <p className="info-des">{description}</p>
          </div>
          <p className="title-box-time">{time}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  dpDetailChat: (data, id) => detail_chat(data, id),
};

export default connect(null, mapDispatchToProps)(ChatTitleBox);
