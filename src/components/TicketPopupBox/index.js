import React, { Component } from "react";
import "./style.css";
import _, { get, map, size } from "lodash";
import { connect } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { hidePopup } from "./../../app/services";
import {
  createComment,
  clearDetail,
} from "../../features/myprofile/view/ticket/services";
import LoadingBox from "../LoadingBox";
import ItemTicketPopup from "../ItemTicketPopup";
import { AUTH_ID, PERSIST_KEY } from "../../constants/config";
import moment from "moment";
class TicketPopupBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckEditor: false,
      editorState: EditorState.createEmpty(),
      sellectTags: false,
    };
  }

  _onClose = () => {
    this.props.dpClose();
    this.props.dpClearDetail();
    this.setState({
      ckEditor: false,
    });
  };

  _onOpenEditor = () => {
    this.setState({
      ckEditor: true,
    });
  };

  _onPostEditor = (id, status) => {
    let storage = window.localStorage.getItem(PERSIST_KEY);
    let requester_id = JSON.parse(JSON.parse(storage).root).userProfile.data
      .requester_id;
    if (requester_id === null) requester_id = AUTH_ID;
    const arrComment = convertToRaw(this.state.editorState.getCurrentContent())
      .blocks;
    let text = "";
    for (let i = 0; i < size(arrComment); i++) {
      text = text + arrComment[i].text + "\n\n";
    }
    const ticketComment = {
      ticket: {
        comment: {
          body: text,
          author_id: requester_id,
        },
      },
    };
    this.props.dpCommentTicket(ticketComment, id, status);
    this.setState({
      ckEditor: false,
      editorState: EditorState.createEmpty(),
    });
  };

  _onCloseEditor = () => {
    this.setState({
      ckEditor: false,
      editorState: EditorState.createEmpty(),
    });
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  _handleInput = () => {};

  _onShowTags = () => {
    this.setState({
      sellectTags: !this.state.sellectTags,
    });
  };

  render() {
    const {
      raw_subject,
      id,
      status,
      tags,
      submitter_id,
      via,
      created_at,
    } = this.props.item;
    console.log("via: ", via);
    return (
      <div className={`ticket-popup-box ${!this.props.isClose ? "" : "show"}`}>
        <div className="ticket-popup-info">
          <div className="ticket-close" onClick={() => this._onClose()}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <div className="popup-header">
            {/* <div className="header-tags">
              <div className="tags-box" onClick={() => this._onShowTags()}>
                <div className="title">
                  <p>Tags</p>
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </div>
                <div
                  className={`list-tags ${
                    this.state.sellectTags ? "show" : ""
                  }`}
                >
                  {map(tags, (item, key) => {
                    return (
                      <div className="tags-item" key={key}>
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div> */}
          </div>
          <div className="popup-body">
            <div className="popup-title">
              <p>
                #{id}: {raw_subject}
              </p>
              <h5>{`${moment(`${created_at}`).format("HH:mm MM/DD/YY")} - ${get(
                this.props.detailUser,
                "email",
                ""
              )} ${get(this.props.detailUser, "name", "")}`}</h5>
            </div>
            <div className="list-item-ticket-popup">
              <div className="list-item-shadow">
                {map(this.props.detail, (item, key) => {
                  if (item.events[0].type === "Comment") {
                    const ItemProps = {
                      authorId: item.events[0].author_id,
                      auditId: item.events[0].audit_id,
                      createdAt: item.created_at,
                      events: item.events[0],
                      submitter_id,
                    };
                    return (
                      <ItemTicketPopup {...ItemProps} key={key} check={key} />
                    );
                  }
                })}
              </div>
              <LoadingBox />
            </div>
            <div className="popup-footer">
              <div className="reply" onClick={() => this._onOpenEditor()}>
                <i className="fa fa-reply" aria-hidden="true"></i>
                <p>Reply</p>
              </div>
              {/* <div className="action">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                <p>Edit</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className={`ticket-ckeditor ${this.state.ckEditor ? "show" : ""}`}>
          <div className="ckeditor-box">
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <div className={"ckeditor-action"}>
            <div
              className={"post-ckeditor"}
              onClick={() => this._onPostEditor(id, status)}
            >
              Post
            </div>
            <div
              className={"post-ckeditor"}
              onClick={() => this._onCloseEditor()}
            >
              Cancle
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isClose: _.get(state, "ticket.close", "false"),
    detail: _.get(state, "ticket.detailTicket", []),
    detailUser: _.get(state, "ticket.detailUser", {}),
  };
};

const mapDispatchToProps = {
  dpCommentTicket: (data, id, status) => createComment(data, id, status),
  dpClose: () => hidePopup(),
  dpClearDetail: () => clearDetail(),
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketPopupBox);
