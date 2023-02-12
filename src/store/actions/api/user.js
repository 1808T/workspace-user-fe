import axios from 'axios';
import { toast } from 'react-toastify';

const updateUser = async (payload) => {
  try {
    const res = await axios.put(`/user/update`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const uploadAvatar = async (payload) => {
  const { formData } = payload;
  try {
    const res = await axios.post(`/user/upload-avatar`, formData);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const uploadCover = async (payload) => {
  const { formData } = payload;
  try {
    const res = await axios.post(`/user/upload-cover`, formData);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const changePassword = async (payload) => {
  try {
    const res = await axios.put('/user/change-password', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const getUserInfo = async (userId) => {
  try {
    const res = await axios.get(`/user/${userId}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const userApi = {
  updateUser,
  uploadAvatar,
  uploadCover,
  changePassword,
  getUserInfo,
};

export default userApi;
