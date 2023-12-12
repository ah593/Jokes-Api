import axios from "axios";

class JokesDataService {
  getJokes(pageNumber = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/jokes?pageNumber=${pageNumber}`
    );
  }

  getJokeById(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/jokes/id/${id}`
    );
  }

  find(query, by = "title", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/jokes?${by}=${query}&page=${page}`
    );
  }

  addComment(data) {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/comment`,
      { ...data }
    );
  }

  updateComment(data) {
    return axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/comment`,
      { data }
    );
  }

  deleteComment(commentId, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/comment`,
      { data: { comment_id: commentId, user_id: userId } }
    );
  }
  getCategories() {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ah593/categories`
    );
  }
}

export default new JokesDataService();
