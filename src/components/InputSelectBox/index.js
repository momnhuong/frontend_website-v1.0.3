import React, { Component } from "react";
import "./style.css";
import { map } from "lodash";

class InputSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelect: false,
      value: "",
    };
  }

  _onOpenSellect = () => {
    this.setState({
      ...this.state,
      showSelect: true,
    });
  };

  _onChoose = (value) => {
    switch (this.props.type) {
      case "status":
        this.props.handleInput(value, this.props.type);
        break;
      case "tags":
        this.props.handleInput(value, this.props.type);
        break;
      case "type":
        this.props.handleInput(value, this.props.type);
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      value,
      showSelect: false,
    });
  };
  render() {
    const { placeholder, list } = this.props;
    return (
      <div
        className={`input-select-box ${this.state.showSelect ? "show" : ""}`}
      >
        <input
          className="cls-input"
          placeholder={placeholder}
          onClick={() => this._onOpenSellect()}
          value={this.state.value}
        />
        <div className="title-sellect">
          <div className="sellect-item" onClick={() => this._onChoose("")}>
            {"default"}
          </div>
          {map(list, (item, key) => {
            return (
              <div
                className="sellect-item"
                key={key}
                onClick={() => this._onChoose(item.name)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default InputSelectBox;
