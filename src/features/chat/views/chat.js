import { get, map } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { IMAGES } from "../../../assets";
import AboutProfileBox from "../../../components/AboutProfileBox";
import AvatarBox from "../../../components/AvatarBox";
import ChatTitleBox from "../../../components/ChatTitleBox";
import { detail_chat, list_chat } from "../services";
import "./style.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageChat: "",
      activeChat: 1,
      showSidebar: false,
      showAboutOwner: false,
      showAboutCustomer: false,
    };
  }

  _onClickId = (id) => {
    this.setState({
      activeChat: id,
    });
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(this.state.messageChat);
      this.setState({ ...this.state, messageChat: "" });
    }
  };

  _onShowSidebar = () => {
    this.setState({
      ...this.state,
      showSidebar: true,
    });
  };

  _onHideSidebar = () => {
    this.setState({
      ...this.state,
      showSidebar: false,
    });
  };

  _onHideAboutOwner = () => {
    this.setState({
      ...this.state,
      showAboutOwner: false,
    });
  };

  _onShowAboutOwner = () => {
    this.setState({
      ...this.state,
      showAboutOwner: true,
    });
  };

  _onShowAboutCustomer = () => {
    this.setState({
      ...this.state,
      showAboutCustomer: true,
    });
  };

  _onHideAboutCustomer = () => {
    this.setState({
      ...this.state,
      showAboutCustomer: false,
    });
  };

  _onChange = (e) => {
    this.setState({
      ...this.state,
      messageChat: e.target.value,
    });
  };
  componentDidMount() {
    this.props.dpListChat();
    this.props.dpDetailChat([], 1);
  }

  render() {
    return (
      <div className="chat-page">
        <div className={`chat-box ${this.state.showSidebar ? "show" : ""}`}>
          <div
            className={`chat-sidebar ${
              this.state.showAboutOwner ? "show" : ""
            }`}
          >
            <AboutProfileBox
              avatar={IMAGES.avatar}
              title={"John Smith"}
              onPopup={this._onHideAboutOwner}
            />
            <div className="chat-sidebar-nav">
              <div className="close-box" onClick={() => this._onHideSidebar()}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
              <div className="avt" onClick={() => this._onShowAboutOwner()}>
                <AvatarBox img={IMAGES.avatar} />
              </div>
              <div className="chat-search">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  className="i-search"
                  placeholder="Search or start new chat"
                />
              </div>
            </div>
            <div className="chat-sidebar-body">
              <div className="s-body-title">
                <p>Chats</p>
              </div>
              <div className="s-body-content">
                {map(this.props.listChat, (item, key) => {
                  return (
                    <ChatTitleBox
                      {...item}
                      onHandleClick={this._onClickId}
                      activeChat={this.state.activeChat}
                      key={key}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`chat-content ${
              this.state.showAboutCustomer ? "show" : ""
            }`}
          >
            <AboutProfileBox
              avatar={this.props.detailChat.avatar}
              title={this.props.detailChat.title}
              onPopup={this._onHideAboutCustomer}
            />
            <div className="profile-customer"></div>
            <div className="chat-content-nav">
              <i
                className="fa fa-bars"
                aria-hidden="true"
                onClick={() => this._onShowSidebar()}
              ></i>
              <div className="" onClick={() => this._onShowAboutCustomer()}>
                <AvatarBox img={this.props.detailChat.avatar} />
              </div>
              <div className="content-nav-tilte">
                <p>{this.props.detailChat.title}</p>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </div>
            </div>
            <div className="chat-content-body">
              <div className="content-body-main">
                <div className="chat">
                  <div className="chat-item">
                    <p>Hello you, What is your name?</p>
                  </div>
                </div>
                <div className="chat chat-left">
                  <div className="chat-item">
                    <p>Hi, My name John</p>
                  </div>
                </div>
                <div className="chat">
                  <div className="chat-item">
                    <p>How are you doing today</p>
                  </div>
                </div>
                <div className="chat chat-left">
                  <div className="chat-item">
                    <p>I'm fine thanks</p>
                  </div>
                </div>
                <div className="chat chat-left">
                  <div className="chat-item">
                    <p>And you?</p>
                  </div>
                </div>
                <div className="chat">
                  <div className="chat-item">
                    <p>Yes, I'm good</p>
                  </div>
                </div>
                <div className="chat chat-left">
                  <div className="chat-item">
                    <p>Do you add ticket today?</p>
                  </div>
                </div>
                <div className="chat">
                  <div className="chat-item">
                    <p>{"Not yet :))"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-content-form">
              <div className="form-submit">
                <input
                  value={this.state.messageChat}
                  name=""
                  placeholder="Type your message"
                  onKeyDown={this._handleKeyDown}
                  onChange={(e) => this._onChange(e)}
                />
                <div className="form-send">Submit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listChat: get(state, "chat.listChat", []),
    detailChat: get(state, "chat.detailChat", {}),
  };
};

const mapDispatchToProps = {
  dpListChat: () => list_chat(),
  dpDetailChat: (data, id) => detail_chat(data, id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
