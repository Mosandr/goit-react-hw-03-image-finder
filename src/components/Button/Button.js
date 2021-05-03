import { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const { text, onClick } = this.props;
    return (
      <button className="Button" type="button" onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button;

PropTypes.Button = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
