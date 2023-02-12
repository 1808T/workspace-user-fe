import axios from 'axios';
import { toast } from 'react-toastify';

const createComment = async (payload) => {
  try {
    const res = await axios.post('/comment', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const getComments = async (cardId) => {
  try {
    const res = await axios.get(`/comment/${cardId}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const editComment = async (id, payload) => {
  try {
    const res = await axios.put(`/comment/${id}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const deleteComment = async (id) => {
  try {
    const res = await axios.delete(`/comment/${id}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const likeComment = async (id, payload) => {
  try {
    const res = await axios.put(`/comment/like/${id}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const unlikeComment = async (id, payload) => {
  try {
    const res = await axios.put(`/comment/unlike/${id}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const commentApi = {
  createComment,
  getComments,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment,
};

export default commentApi;
