import axios from 'axios';
import { toast } from 'react-toastify';

const createList = async (payload) => {
  const { title, boardId } = payload;
  try {
    const res = await axios.post('/list', { title, boardId });
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const updateList = async (listId, payload) => {
  try {
    const res = await axios.put(`/list/${listId}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const deleteList = async (listId) => {
  try {
    const res = await axios.delete(`/list/${listId}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const listApi = { createList, updateList, deleteList };

export default listApi;
