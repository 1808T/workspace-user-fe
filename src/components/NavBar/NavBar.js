import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../store/actions/auth';
import SearchPreview from '../SearchPreview/SearchPreview';
import { Avatar, Select, MenuItem } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classes from './NavBar.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export default function NavBar({ sideBarVisibility, onSideBarShow }) {
  const userState = useSelector((state) => state.auth.user);
  const user = JSON.parse(userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const reg = /\s\s+/g;
  const searchValue = query.replace(reg, ' ').trim();
  const [searchPreviewVisibility, setSearchPreviewVisibility] = useState(false);

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const toggleSideBarHandler = () => {
    onSideBarShow(!sideBarVisibility);
  };

  const showSearchPreviewHandler = () => {
    setSearchPreviewVisibility(true);
  };

  const closeSearchPreviewHandler = () => {
    setSearchPreviewVisibility(false);
  };

  const signOutHandler = () => {
    dispatch(signOut(navigate));
  };

  const menuBtnClassName = clsx(classes['nav--menu-btn'], {
    [classes['show-side-bar']]: sideBarVisibility,
  });

  return (
    <div className={classes.nav}>
      <div className={menuBtnClassName}>
        {sideBarVisibility ? (
          <button onClick={toggleSideBarHandler}>
            <MenuOpenRoundedIcon />
          </button>
        ) : (
          <button onClick={toggleSideBarHandler}>
            <MenuRoundedIcon />
          </button>
        )}
      </div>
      <form
        className={classes['nav--search-bar']}
        onFocus={showSearchPreviewHandler}>
        <input
          placeholder="Search..."
          type="text"
          value={query}
          onChange={queryChangeHandler}
        />
        <button type="submit">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.7309 18.3109L16.0209 14.6309C17.461 12.8353 18.1584 10.5562 17.9697 8.2622C17.781 5.9682 16.7206 3.83368 15.0064 2.29754C13.2923 0.761407 11.0547 -0.0595894 8.75382 0.00337096C6.45294 0.0663314 4.26362 1.00846 2.63604 2.63604C1.00846 4.26362 0.0663314 6.45294 0.00337096 8.75382C-0.0595894 11.0547 0.761407 13.2923 2.29754 15.0064C3.83368 16.7206 5.9682 17.781 8.2622 17.9697C10.5562 18.1584 12.8353 17.461 14.6309 16.0209L18.3109 19.7009C18.4039 19.7946 18.5145 19.869 18.6363 19.9198C18.7582 19.9706 18.8889 19.9967 19.0209 19.9967C19.1529 19.9967 19.2836 19.9706 19.4055 19.9198C19.5273 19.869 19.6379 19.7946 19.7309 19.7009C19.9111 19.5144 20.0119 19.2652 20.0119 19.0059C20.0119 18.7466 19.9111 18.4974 19.7309 18.3109ZM9.0209 16.0209C7.63643 16.0209 6.28305 15.6104 5.13191 14.8412C3.98076 14.072 3.08356 12.9788 2.55374 11.6997C2.02393 10.4206 1.88531 9.01314 2.1554 7.65527C2.4255 6.2974 3.09219 5.05012 4.07115 4.07115C5.05012 3.09219 6.2974 2.4255 7.65527 2.1554C9.01314 1.88531 10.4206 2.02393 11.6997 2.55374C12.9788 3.08356 14.072 3.98076 14.8412 5.13191C15.6104 6.28305 16.0209 7.63643 16.0209 9.0209C16.0209 10.8774 15.2834 12.6579 13.9706 13.9706C12.6579 15.2834 10.8774 16.0209 9.0209 16.0209Z"
              fill="#94A2BC"
            />
          </svg>
        </button>
        {searchPreviewVisibility && (
          <SearchPreview
            closeSearchPreviewHandler={closeSearchPreviewHandler}
            query={searchValue}
          />
        )}
      </form>
      <div className={classes['nav--user-profile']}>
        <div className={classes['notification']}>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2_1368)">
                <path
                  d="M21 18.0233C21 18.5113 20.6043 18.907 20.1163 18.907H3.88372C3.39565 18.907 3 18.5113 3 18.0233C3 17.5352 3.39566 17.1395 3.88372 17.1395H3.9V10.9809C3.9 6.57288 7.527 3 12 3C16.473 3 20.1 6.57288 20.1 10.9809V17.1395H20.1163C20.6043 17.1395 21 17.5352 21 18.0233ZM5.7 17.1395H18.3V10.9809C18.3 7.5494 15.4794 4.76744 12 4.76744C8.5206 4.76744 5.7 7.5494 5.7 10.9809V17.1395ZM9.97604 20.7558C9.73121 20.2608 10.1977 19.7907 10.75 19.7907H13.25C13.8023 19.7907 14.2688 20.2608 14.024 20.7558C13.9155 20.9751 13.7699 21.1773 13.591 21.3529C13.169 21.7672 12.5967 22 12 22C11.4033 22 10.831 21.7672 10.409 21.3529C10.2301 21.1773 10.0845 20.9751 9.97604 20.7558Z"
                  fill="#768396"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_1368">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className={classes['user-avatar']}>
          {!user.avatar ? (
            <Avatar>{user.username[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar alt="user-avatar" src={user.avatar} />
          )}
          <Select
            disableUnderline
            variant="filled"
            sx={{
              background: 'none',
              '& .MuiSvgIcon-root': {
                fontSize: '1.8rem',
                color: '#5051f9',
              },
            }}
            IconComponent={KeyboardArrowDownIcon}>
            <MenuItem
              onClick={() => {
                navigate('/settings');
              }}>
              Your Profile
            </MenuItem>
            <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}
