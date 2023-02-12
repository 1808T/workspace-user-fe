import axios from 'axios';
import { toast } from 'react-toastify';

const createBoard = async (payload) => {
  try {
    const res = await axios.post('/board', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const updateBoard = async (boardId, payload) => {
  try {
    const res = await axios.put(`/board/${boardId}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const deleteBoard = async (boardId) => {
  try {
    const res = await axios.delete(`/board/${boardId}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchAllYoursBoards = async () => {
  try {
    const res = await axios.get('/board/your-boards');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchAllInvitedBoards = async () => {
  try {
    const res = await axios.get('/board/invited-boards');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchBoardDetail = async (boardId) => {
  try {
    const res = await axios.get(`/board/${boardId}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchBoardProgress = async () => {
  try {
    const res = await axios.get('/board/progress');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchCompletedBoards = async () => {
  try {
    const res = await axios.get('/board/completed');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const addMember = async (payload) => {
  try {
    const res = await axios.post('/board/add-member', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const removeMember = async (payload) => {
  try {
    const res = await axios.post('/board/remove-member', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const searchBoard = async (payload) => {
  try {
    const res = await axios.post('/board/search', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const leaveBoard = async (boardId) => {
  try {
    const payload = { boardId };
    const res = await axios.put('/board/leave', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const boardApi = {
  createBoard,
  updateBoard,
  deleteBoard,
  fetchAllYoursBoards,
  fetchAllInvitedBoards,
  fetchBoardDetail,
  fetchBoardProgress,
  fetchCompletedBoards,
  addMember,
  removeMember,
  searchBoard,
  leaveBoard,
};

export default boardApi;
