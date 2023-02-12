import axios from 'axios';
import { toast } from 'react-toastify';

const createCard = async (payload) => {
  const { title, boardId, listId } = payload;
  try {
    const res = await axios.post('/card', { title, boardId, listId });
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const updateCard = async (cardId, payload) => {
  try {
    const res = await axios.put(`/card/${cardId}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const deleteCard = async (cardId, payload) => {
  try {
    const res = await axios.delete(`/card/${cardId}`, { data: payload });
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const moveCardToOtherList = async (payload) => {
  try {
    const res = await axios.put('/card/move-to-other-list', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const uploadCardImage = async (payload) => {
  const { cardId, formData } = payload;
  try {
    const res = await axios.post(`/card/upload/${cardId}`, formData);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const getMonthlyCards = async () => {
  try {
    const res = await axios.get('/card/monthly');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const getWeeklyDoneCards = async () => {
  try {
    const res = await axios.get('/card/weekly-done');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const getWeeklyNewCards = async () => {
  try {
    const res = await axios.get('/card/weekly-new');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const searchCards = async (payload) => {
  try {
    const res = await axios.post('/card/search', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const cardApi = {
  createCard,
  updateCard,
  deleteCard,
  moveCardToOtherList,
  uploadCardImage,
  getMonthlyCards,
  getWeeklyDoneCards,
  getWeeklyNewCards,
  searchCards,
};

export default cardApi;
