import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.API_URL,
    timeout: 5000,
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
