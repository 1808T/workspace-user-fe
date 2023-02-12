import axios from 'axios';
import { signOut } from '../store/actions/auth';

const baseURL = process.env.REACT_APP_API;
axios.defaults.baseURL = baseURL;

const setBearerToken = (bearerToken) => {
  if (bearerToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const res = error.response;
    if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
      signOut();
    }
    return Promise.reject(error);
  },
);

export default setBearerToken;
