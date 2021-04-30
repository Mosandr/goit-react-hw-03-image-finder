import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "20678815-cff8880680826357b58c80b80";

class ApiService {
  fetchImages(query, page, pagination) {
    return axios
      .get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pagination}`
      )
      .then((response) => response.data.hits);
  }
}

export default new ApiService();
