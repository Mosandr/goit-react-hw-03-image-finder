import { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom/cjs/react-dom.development";
import { render } from "@testing-library/react";

const notificationRoot = document.querySelector("#notification");

class Notification extends Component {
  render() {
    const { text, type } = this.props;
    return createPortal(<div className={type}>{text}</div>, notificationRoot);
  }
}

export default Notification;

PropTypes.Notification = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
