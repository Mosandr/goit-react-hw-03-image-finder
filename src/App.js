import { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Button from ".//components/Button";
import api from "./utils/apiService";

class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    page: 1,
    showModal: false,
    activeImgId: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (page !== prevPage) {
      api
        .fetchImages(searchQuery, page, 12)
        .then((data) => {
          this.setState(({ images }) => {
            return { images: [...images, ...data] };
          });
        })
        .catch((error) => console.log(error));
    }

    if (searchQuery !== prevQuery) {
      api
        .fetchImages(searchQuery, page, 12)
        .then((data) => {
          this.setState({ images: data });
        })
        .catch((error) => console.log(error));
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

  findImageById = (id) => {
    if (!id) return null;
    const image = this.state.images.find((image) => image.id === Number(id));
    return image;
  };

  render() {
    const { images, showModal, activeImgId } = this.state;
    const activeImage = this.findImageById(activeImgId);

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery data={images} onImgClick={this.onGalleryImgClick} />
        <Button text="Load More" />
        {showModal && activeImage && (
          <Modal
            src={activeImage.largeImageURL}
            alt={activeImage.description}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
