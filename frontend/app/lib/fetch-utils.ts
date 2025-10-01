import axios from "axios";

// ✅ Define base URL (from environment variable or fallback to localhost)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api-v1";

// ✅ Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // always send JSON
  },
});

// ✅ Request interceptor (runs before every request)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach token to headers
  }
  return config; // return updated config
});

// ✅ Response interceptor (runs after every response)
api.interceptors.response.use(
  (response) => {
    return response; // if success, just return response
  },
  (error) => {
    // if server responds with 401 Unauthorized → force logout
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error); // reject error for further handling
  }
);

//
// ----------- API Helper Functions -----------
//

// ✅ POST request
const postData = async <T>(path: string, data: unknown): Promise<T> => {
  const response = await api.post(path, data);
  return response.data;
};

// ✅ GET request
const getData = async <T>(path: string): Promise<T> => {
  const response = await api.get(path);
  return response.data;
};

// ✅ PUT request (update data)
const updateData = async <T>(path: string, data: unknown): Promise<T> => {
  const response = await api.put(path, data);
  return response.data;
};

// ❌ DELETE request (⚠️ BUG: you're using POST instead of DELETE)
const deleteData = async <T>(path: string): Promise<T> => {
  const response = await api.delete(path); // <-- should be .delete not .post
  return response.data;
};

// ✅ Export helpers for use in React Query or anywhere else
export { postData, getData, updateData, deleteData };
