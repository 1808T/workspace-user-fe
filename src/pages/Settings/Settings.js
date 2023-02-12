import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import classes from './Settings.module.scss';
import clsx from 'clsx';
import { Avatar, CardMedia } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import userApi from '../../store/actions/api/user';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { update, signOut } from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';

export default function Settings({ sideBarVisibility, onSideBarShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  let user = JSON.parse(localStorage.getItem('user'));
  const [avatar, setAvatar] = useState(user.avatar);
  const [cover, setCover] = useState(user.cover);
  const [fullName, setFullName] = useState(user.fullName);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);

  const showProfileVisibility = () => {
    setProfileVisibility(true);
    setPasswordVisibility(false);
  };

  const showPasswordVisibility = () => {
    setProfileVisibility(false);
    setPasswordVisibility(true);
  };

  const fullNameChangeHandler = (e) => {
    setFullName(e.target.value);
  };

  const currentPasswordChangeHandler = (e) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const repeatNewPasswordChangeHandler = (e) => {
    setRepeatNewPassword(e.target.value);
  };

  const resetHandler = () => {
    setFullName(user.fullName);
    setAvatar(user.avatar);
    setCover(user.cover);
  };

  const avatarChangeHandler = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('avatar', file);
    const payload = { formData };
    setLoadingAvatar(true);
    userApi
      .uploadAvatar(payload)
      .then((data) => {
        const { avatar } = data;
        setAvatar(avatar);
      })
      .finally(() => {
        setLoadingAvatar(false);
        e.target.value = null;
      });
  };

  const coverChangeHandler = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    const payload = { formData };
    setLoadingCover(true);
    userApi
      .uploadCover(payload)
      .then((data) => {
        const { cover } = data;
        setCover(cover);
      })
      .finally(() => {
        setLoadingCover(false);
        e.target.value = null;
      });
  };

  const saveInfoHandler = (e) => {
    e.preventDefault();
    if (
      fullName === user.fullName &&
      avatar === user.avatar &&
      cover === user.cover
    ) {
      return;
    }
    const payload = {
      fullName,
      avatar,
      cover,
    };
    userApi.updateUser(payload).then((data) => {
      const { updatedUser } = data;
      user = updatedUser;
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(update(JSON.stringify(user)));
    });
  };

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (newPassword !== repeatNewPassword) {
      toast.error('Password do not match.', { theme: 'colored' });
      toggleModal();
      return;
    }
    const payload = { currentPassword, newPassword, repeatNewPassword };
    userApi.changePassword(payload).then((data) => {
      toggleModal();
      if (data) {
        dispatch(signOut(navigate));
      }
    });
  };

  const settingsContainerClassName = clsx(classes['settings-container'], {
    [classes['show-side-bar']]: sideBarVisibility,
  });

  return (
    <React.Fragment>
      <NavBar
        sideBarVisibility={sideBarVisibility}
        onSideBarShow={onSideBarShow}
      />
      <Sidebar
        sideBarVisibility={sideBarVisibility}
        onSideBarShow={onSideBarShow}
      />
      <form className={settingsContainerClassName}>
        <div className={classes['user-images']}>
          {loadingCover && (
            <div className={classes['loading-cover']}>
              <CircularProgress />
            </div>
          )}
          {cover ? (
            <CardMedia component="img" alt="user-cover" image={cover} />
          ) : (
            <CardMedia
              component="img"
              alt="user-cover"
              image="/images/default-cover.jpg"
            />
          )}
          <div className={classes['cover--change-btn']}>
            <label htmlFor="user-cover">
              <PhotoCameraIcon />
              <span>Change cover photo</span>
            </label>
            <input
              type="file"
              id="user-cover"
              accept="image/*"
              hidden
              onChange={coverChangeHandler}
            />
          </div>
          <div className={classes['user-images--avatar-container']}>
            <div className={classes['avatar']}>
              {loadingAvatar && (
                <div className={classes['loading-avatar']}>
                  <CircularProgress />
                </div>
              )}
              {!avatar ? (
                <Avatar
                  sx={{ width: '100%', height: '100%', fontSize: '50px' }}>
                  {user.username[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  sx={{ width: '100%', height: '100%' }}
                  alt="user-avatar"
                  src={avatar}></Avatar>
              )}
              <div className={classes['avatar--change-btn']}>
                <label htmlFor="user-avatar">
                  <PhotoCameraIcon />
                </label>
                <input
                  type="file"
                  id="user-avatar"
                  accept="image/*"
                  hidden
                  onChange={avatarChangeHandler}
                />
              </div>
            </div>
            <div className={classes['username']}>{user.username}</div>
            <div className={classes['images-btn-group']}>
              {passwordVisibility ? (
                <button
                  type="button"
                  onClick={toggleModal}
                  disabled={
                    !currentPassword || !newPassword || !repeatNewPassword
                      ? true
                      : false
                  }>
                  Change
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={resetHandler}
                    disabled={loadingAvatar || loadingCover ? true : false}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={saveInfoHandler}
                    disabled={loadingAvatar || loadingCover ? true : false}>
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-btn-group']}>
            <button
              type="button"
              onClick={showProfileVisibility}
              className={profileVisibility ? classes['active'] : ''}>
              Profile
            </button>
            <button
              type="button"
              onClick={showPasswordVisibility}
              className={passwordVisibility ? classes['active'] : ''}>
              Password
            </button>
          </div>
          <div className={classes['user-info--content']}>
            {profileVisibility && (
              <>
                <div className={classes['input-group']}>
                  <label htmlFor="fullName">Full name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={fullNameChangeHandler}
                  />
                </div>
                <div className={classes['input-group']}>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" value={user.email} readOnly />
                  <EmailOutlinedIcon
                    sx={{ position: 'absolute', top: '34px', left: '10px' }}
                  />
                </div>
              </>
            )}
            {passwordVisibility && (
              <>
                <div className={classes['input-group']}>
                  <label htmlFor="currentPassword">Current password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={currentPasswordChangeHandler}
                  />
                </div>
                <div className={classes['input-group']}>
                  <label htmlFor="newPassword">New password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={newPasswordChangeHandler}
                  />
                </div>
                <div className={classes['input-group']}>
                  <label htmlFor="repeatNewPassword">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    id="repeatNewPassword"
                    value={repeatNewPassword}
                    onChange={repeatNewPasswordChangeHandler}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {ReactDOM.createPortal(
          <ConfirmModal
            modalVisibility={modalVisibility}
            toggleModal={toggleModal}
            title="Change Password"
            content={`Are you sure want to change your password? You will have to log in again.`}
            onAction={changePasswordHandler}
          />,
          document.getElementById('modal-root'),
        )}
      </form>
    </React.Fragment>
  );
}
