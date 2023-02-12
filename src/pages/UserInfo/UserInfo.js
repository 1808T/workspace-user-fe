import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';
import classes from './UserInfo.module.scss';
import clsx from 'clsx';
import userApi from '../../store/actions/api/user';
import { Avatar, CardMedia } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function UserInfo({ sideBarVisibility, onSideBarShow }) {
  const { id } = useParams();
  const initialUserState = {
    _id: null,
    username: 'user',
    email: '',
    fullName: '',
    avatar: null,
    isActive: null,
    isAdmin: null,
  };
  const [user, setUser] = useState(initialUserState);

  const userInfoContainerClassName = clsx(classes['user-info-container'], {
    [classes['show-side-bar']]: sideBarVisibility,
  });

  useEffect(() => {
    userApi.getUserInfo(id).then((data) => {
      const { user } = data;
      setUser(user);
    });
  }, [id]);

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
      <section className={userInfoContainerClassName}>
        <div className={classes['user-images']}>
          {user.cover ? (
            <CardMedia component="img" alt="user-cover" image={user.cover} />
          ) : (
            <CardMedia
              component="img"
              alt="user-cover"
              image="/images/default-cover.jpg"
            />
          )}
          <div className={classes['user-images--avatar-container']}>
            <div className={classes['avatar']}>
              {!user.avatar ? (
                <Avatar
                  sx={{ width: '100%', height: '100%', fontSize: '50px' }}>
                  {user.username[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  sx={{ width: '100%', height: '100%' }}
                  alt="user-avatar"
                  src={user.avatar}></Avatar>
              )}
            </div>
            <div className={classes['username']}>{user.username}</div>
            <div className={classes['images-btn-group']}></div>
          </div>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-btn-group']}>
            <button type="button">Profile</button>
          </div>
          <div className={classes['user-info--content']}>
            <>
              <div className={classes['input-group']}>
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  value={user.fullName}
                  readOnly
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
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
