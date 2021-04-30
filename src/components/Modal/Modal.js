import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#image-modal");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscapeCloseHandle);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscapeCloseHandle);
  }

  onBackdropCLickHandle = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  onEscapeCloseHandle = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <div onClick={this.onBackdropCLickHandle} className="Overlay">
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

PropTypes.Modal = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
