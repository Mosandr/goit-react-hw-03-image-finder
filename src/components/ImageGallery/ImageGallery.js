import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ data, onImgClick }) => {
  return (
    <ul className="ImageGallery">
      {data.map(({ id, webformatURL, description }) => {
        return (
          <ImageGalleryItem
            onImgClick={onImgClick}
            key={id}
            id={id}
            webformatURL={webformatURL}
            description={description}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

PropTypes.ImageGallery = {
  onImgClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webFormatUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ),
};
