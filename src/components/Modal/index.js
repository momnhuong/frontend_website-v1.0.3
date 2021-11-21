import Modal from "react-modal";
import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, data: [] };
  }
  componentDidMount() {
    Modal.setAppElement("body");
  }

  show = (param) => this.setState({ visible: true, data: param });

  hide = () => {
    this.setState({ visible: false });
  };

  onSubmit = () => {
    this.hide();
    this.props.toggle(this.state.data);
  };

  render() {
    const { visible } = this.state;
    const { label, description, labelSubmit, labelCancel, toggle } = this.props;

    return (
      <Modal
        isOpen={visible}
        toggle={toggle}
        className="containerModal"
        contentLabel={label}
      >
        <div className="bodyModal">
          <h4 className="label">{label}</h4>
          <p>{description} </p>

          <button
            type="button"
            className="modal-button-cancel"
            onClick={() => this.hide()}
          >
            {labelCancel}
          </button>

          <button
            type="button"
            className="modal-button-cancel"
            onClick={() => this.onSubmit()}
          >
            {labelSubmit}
          </button>
        </div>
      </Modal>
    );
  }
}
index.defaultProps = {
  label: "",
  description: "",
  visibleModal: false,
  labelSubmit: "",
  labelCancel: "",
};
index.propsType = {
  label: PropTypes.string,
  description: PropTypes.string,
  visibleModal: PropTypes.bool,
  labelSubmit: PropTypes.string,
  labelCancel: PropTypes.string,
  toggle: PropTypes.func,
};

export default index;
