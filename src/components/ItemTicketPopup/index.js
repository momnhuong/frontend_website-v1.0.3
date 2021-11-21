import React, { Component } from "react";
import moment from "moment";
import AvatarBox from "../AvatarBox";
import { IMAGES } from "../../assets";
import { map, get } from "lodash";
import { getInfoAuthor } from "../../features/myprofile/view/ticket/services";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";

class ItemTicketPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dpIdAuthor(
      this.props.authorId,
      this.props.submitter_id,
      this.props.check
    );
  }

  render() {
    const { createdAt, events, check, listUser } = this.props;
    return (
      <div className="item-ticket-popup">
        <div className="item-ticket-box">
          <div className="ticket-popup-header">
            <div className="popup-header-avatar">
              <AvatarBox img={IMAGES.avatar} />
              {map(listUser, (item, key) => {
                if (item[0] === check) return <p>{item[1]}</p>;
              })}
            </div>
            <p>{moment(createdAt).format("DD-MM-YYYY")}</p>
          </div>
          <div className="ticket-popup-content">
            <ReactMarkdown source={events.body} />
            {/* <p>{events.body}</p> */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listUser: get(state, "ticket.comment.listUser", []),
  };
};

const mapDispatchToProps = {
  dpIdAuthor: (auId, suId, chID) => getInfoAuthor(auId, suId, chID),
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTicketPopup);
