import { Component } from "react";

class Button extends Component {
  render() {
    const { text } = this.props;
    return (
      <button className="Button" type="button">
        {text}
      </button>
    );
  }
}

export default Button;
