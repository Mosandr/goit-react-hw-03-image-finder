import { Component } from "react";
import PropTypes from "prop-types";

class ImageGalleyItem extends Component {
  handleOnImageClick = (event) => {
    const id = event.target.dataset.id;
    this.props.onImgClick(id);
  };

  render() {
    const { id, webformatURL, description } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.handleOnImageClick}
          src={webformatURL}
          alt={description}
          className="ImageGalleryItem-image"
          data-id={id}
        />
      </li>
    );
  }
}

export default ImageGalleyItem;

PropTypes.ImageGalleyItem = {
  id: PropTypes.string.isRequired,
  webFormatUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
