import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import classes from './DashboardMessage.module.scss';
import GridViewIcon from '@mui/icons-material/GridView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HTMLReactParser from 'html-react-parser';

export default function DashboardMessage() {
  const emojis = [
    '&#128512;',
    '&#128175;',
    '&#128525;',
    '&#128536;',
    '&#129505;',
    '&#129315;',
    '&#128142;',
    '&#128150;',
    '&#128165;',
  ];
  const [title, setTitle] = useState('');

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const addEmojiHandler = (e) => {
    setTitle((prev) => {
      return `${prev}${e.target.innerText}`;
    });
  };

  return (
    <div className={classes['chat--container']}>
      <div className={classes['call']}>
        <div className={classes['call--header']}>
          <h3>Today's Schedule</h3>
          <div className={classes['btn-group']}>
            <button>
              <GridViewIcon />
            </button>
            <button>
              <CalendarMonthIcon />
            </button>
          </div>
        </div>
        <div className={classes['call--body']}>
          <div className={classes['title']}>
            <div>
              <p>30 minutes call with Client</p>
              <h3>Project Discovery Call</h3>
            </div>
            <button>+ Invite</button>
          </div>
          <div className={classes['content']}>
            <div className={classes['content--avatar-group']}>
              <Avatar src="./images/default-avatar-1.jpg" />
              <Avatar
                src="./images/default-avatar-2.jpg"
                sx={{ position: 'relative', left: '-10px' }}
              />
              <Avatar
                src="./images/default-avatar-3.jpg"
                sx={{ position: 'relative', left: '-20px' }}
              />
              <Avatar
                src="./images/default-avatar-4.jpg"
                sx={{ position: 'relative', left: '-30px' }}
              />
            </div>
            <div className={classes['content--time']}>
              <p>28:35</p>
            </div>
            <div className={classes['content--btn-group']}>
              <button>
                <WifiCalling3Icon />
              </button>
              <button>
                <MoreVertIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 style={{ margin: '15px 0' }}>Messages</h3>
      <div className={classes['chat']}>
        <Avatar
          className={classes['chat--avatar']}
          src="./images/default-avatar-1.jpg"
        />
        <div className={classes['chat--content']}>
          <h4>Cris Morich</h4>
          <p>Hi there! How are you?</p>
        </div>
      </div>
      <div className={classes['chat']}>
        <Avatar
          className={classes['chat--avatar']}
          src="./images/default-avatar-2.jpg"
        />
        <div className={classes['chat--content']}>
          <h4>Charmie</h4>
          <p>Do you need that design?</p>
        </div>
      </div>
      <div className={classes['chat']}>
        <Avatar
          className={classes['chat--avatar']}
          src="./images/default-avatar-3.jpg"
        />
        <div className={classes['chat--content']}>
          <h4>Jason Mandala</h4>
          <p>What is the price of hourly...</p>
        </div>
      </div>
      <div className={classes['chat']}>
        <Avatar
          className={classes['chat--avatar']}
          src="./images/default-avatar-4.jpg"
        />
        <div className={classes['chat--content']}>
          <h4>Charlie Chu</h4>
          <p>Awesome design!!</p>
        </div>
      </div>
      <div className={classes['new-task']}>
        <h3>New task</h3>
        <p>Task Title</p>
        <div>
          <label htmlFor="task-title"></label>
          <input
            type="text"
            id="task-title"
            onChange={titleChangeHandler}
            value={title}
          />
        </div>
        <div className={classes['emoji-picker']}>
          <button>
            <ArrowBackIosNewIcon />
          </button>
          {emojis.map((emoji, index) => (
            <span key={index} onClick={addEmojiHandler}>
              {HTMLReactParser(emoji)}
            </span>
          ))}
          <button>
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <div className={classes['add-collaborators']}>
        <p>Add Collaborators</p>
        <div className={classes['collaborators']}>
          <div className={classes['collaborator']}>
            <Avatar
              sx={{ width: '40px', height: '40px', margin: '0 8px' }}
              className={classes['chat--avatar']}
              src="./images/default-avatar-4.jpg"
            />
            <p>Angela</p>
          </div>
          <div className={classes['collaborator']}>
            <Avatar
              sx={{ width: '40px', height: '40px', margin: '0 8px' }}
              className={classes['chat--avatar']}
              src="./images/default-avatar-3.jpg"
            />
            <p>Chris</p>
          </div>
          <button>
            <AddIcon />
          </button>
          <button>
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
