import { Component } from "react";
import PropTypes from "prop-types";

class Searchbar extends Component {
  state = { searchQuery: "" };

  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={searchQuery}
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

PropTypes.Searchbar = {
  onSubmit: PropTypes.func.isRequired,
};
