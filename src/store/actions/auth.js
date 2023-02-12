import { authActions } from '../slices/auth';
import setBearerToken from '../../utils/axios';
import axios from 'axios';

export const signIn = (payload, navigate, toast) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      try {
        const response = await axios.post('sign-in', payload);
        return response.data;
      } catch (error) {
        toast.error(error.response.data.message, { theme: 'colored' });
        throw new Error(error.response.data.message);
      }
    };

    try {
      const { user, message } = await sendRequest();
      localStorage.setItem('token', user.token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(authActions.signIn(JSON.stringify(user)));
      toast.success(message, { theme: 'colored' });
      if (message) navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = (navigate) => {
  return (dispatch) => {
    setBearerToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    dispatch(authActions.signOut());
    navigate('/');
  };
};

export const update = (user) => {
  return (dispatch) => {
    dispatch(authActions.update(user));
  };
};

export const signUp = async (payload, navigate, toast) => {
  try {
    const res = await axios.post('/sign-up', payload);
    const { message } = res.data;
    toast.success(message, { theme: 'colored' });
    if (message) navigate('/sign-in');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};
