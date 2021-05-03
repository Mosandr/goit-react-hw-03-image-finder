import { Component } from "react";
import shortid from "shortid";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Button from ".//components/Button";
import Loader from "./components/Loader";
import Notification from "./components/Notification";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import api from "./utils/apiService";

class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    page: 1,
    showModal: false,
    activeImgId: "",
    error: "",
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (page !== prevPage) {
      const height = document.documentElement.scrollHeight - 150;
      this.setState({ isLoading: true });

      api
        .fetchImages(searchQuery, page, 12)
        .then((data) => {
          const imageList = this.mapDataForState(data);
          const errorMessage = imageList.length < 1 ? "No more images :(" : "";
          this.setState(({ images }) => {
            return { images: [...images, ...imageList], error: errorMessage };
          });
        })
        .catch((error) => {
          this.setState({ error: "Oops! Something went wrong..." });
        })
        .finally(() => {
          this.setState({ isLoading: false });
          window.scrollTo({
            top: height,
            behavior: "smooth",
          });
        });
    }

    if (searchQuery.toLowerCase() !== prevQuery.toLowerCase()) {
      this.setState({ images: [], isLoading: true });

      api
        .fetchImages(searchQuery, 1, 12)
        .then((data) => {
          const imageList = this.mapDataForState(data);
          const errorMessage = imageList.length < 1 ? "No matches found:(" : "";
          this.setState({ images: imageList, error: errorMessage });
        })
        .catch((error) => {
          this.setState({ error: "Oops! Something went wrong..." });
        })
        .finally(() => {
          this.setState({ isLoading: false });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => {
      return {
        showModal: !showModal,
      };
    });
  };

  onSearchSubmit = (query) => {
    this.setState({ searchQuery: query });
  };

  onGalleryImgClick = (id) => {
    this.setState({ activeImgId: id, showModal: true });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  findImageById = (id) => {
    if (!id) return null;
    const image = this.state.images.find((image) => image.id === id);
    return image;
  };

  // set unique id for each image object to except APIserver issue - repeating images with same id
  mapDataForState = (data) => {
    return data.map((image) => {
      return {
        id: shortid.generate(),
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      };
    });
  };

  render() {
    const { images, showModal, activeImgId, error, isLoading } = this.state;
    const activeImage = this.findImageById(activeImgId);

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery data={images} onImgClick={this.onGalleryImgClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !error && !isLoading && (
          <Button text="Load More" onClick={this.handleLoadMore} />
        )}

        {showModal && activeImage && (
          <Modal
            src={activeImage.largeImageURL}
            alt={activeImage.tags}
            onClose={this.toggleModal}
          />
        )}
        {error && <Notification text={error} type="error" />}
      </div>
    );
  }
}

export default App;
