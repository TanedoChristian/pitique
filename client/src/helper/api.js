import axios from "axios";

const createApi = () => {
  const api = axios.create({
    // TODO: change this to env variable
    baseURL: "http://localhost:8000",
    // timeout: 5000,
  });

  return {
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
  };
};

const api = createApi();

export default api;
