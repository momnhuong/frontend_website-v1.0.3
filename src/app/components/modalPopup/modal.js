import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import PopupLogout from "../../../components/boxLogout";
import DetailTransaction from "../../../features/myprofile/view/transaction/views/detailTransaction";
import DetailContract from "../../../features/myprofile/view/contract/detailContract";
import { hidePopup } from "../../services";
// import BtnClose from './assets/icon-close.svg'
import "./modal.css";
import TicketPopupBox from "../../../components/TicketPopupBox";
import ConfirmBox from "./../../../components/ConfirmBox";
import CreateTicketBox from "../../../components/CreateTicketBox";
import NotificationCart from "../../../features/products/view/cart/notification";
import DetailOrderCustomer from "../../../features/myprofile/view/listOrderCustomer/views/detailOrder";
import DetailProductCustomer from "../../../features/myprofile/view/listProductCustomer/views/listProduct";
import CreateContractSuccess from "../../../features/myprofile/view/listOrderCustomer/views/createContractSuccess";

const customStyles = {
  content: {
    top: "53%",
    // top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "none",
  },
};
class ModalPopup extends Component {
  _closeModal() {
    this.props.hidePopup();
  }

  _renderPopupContent() {
    const { popupType, isDisplay, item } = this.props;

    console.log("_renderPopupContent", popupType, this.props);
    if (isDisplay) {
      switch (popupType) {
        case "popuplogout":
          return <PopupLogout />;
          break;
        case "detailtransaction":
          return <DetailTransaction item={item} />;
          break;
        case "detailcontract":
          return <DetailContract item={item} />;
          break;
        case "popupTicket":
          return <TicketPopupBox item={item} />;
          break;
        case "popupConfirm":
          return <ConfirmBox item={item} />;
          break;
        case "popupCreateTicket":
          return <CreateTicketBox item={item} />;
        case "notificationCartCart":
          return <NotificationCart />;
        case "detailOrderCustomer":
          return <DetailOrderCustomer />;
        case "detailProductCustomer":
          return <DetailProductCustomer />;
        case "createContractSuccess":
          return <CreateContractSuccess />;
        default:
          return;
          break;
      }
    }
  }

  render() {
    const { isDisplay } = this.props;
    return (
      <div className="modal">
        <Modal
          isOpen={isDisplay}
          style={customStyles}
          className="content-model"
          onRequestClose={() => this._closeModal()}
          arentSelector={document.querySelector("#root")}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          <div className="group-icon-modal">{this._renderPopupContent()}</div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  hidePopup: () => hidePopup(),
};

const mapStateToProps = (state) => ({
  isAuth: state.root.isAuth,
  isDisplay: state.root.isDisplayPopup,
  popupType: state.root.popupType,
  item: state.root.item,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalPopup);
