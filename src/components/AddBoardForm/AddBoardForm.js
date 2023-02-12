import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './AddBoardForm.module.scss';
import boardApi from '../../store/actions/api/board';
import { useNavigate, useLocation } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';
import clsx from 'clsx';

export default function CreateBoardForm({
  newBoardFormVisibility,
  onNewBoardFormShow,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [boardTitle, setBoardTitle] = useState('');
  const backgrounds = [
    null,
    '/images/board-background-1.jpg',
    '/images/board-background-2.jpg',
    '/images/board-background-3.jpg',
    '/images/board-background-4.jpg',
  ];
  const [background, setBackground] = useState(null);

  const closeCreateBoardFormHandler = () => {
    onNewBoardFormShow(false);
  };

  const createBoardHandler = (e) => {
    e.preventDefault();
    const payload = {};
    payload.title = boardTitle;
    if (background) {
      payload.background = background;
    }
    boardApi
      .createBoard(payload)
      .then((data) => {
        navigate(`${location.pathname}/${data.newBoard._id}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again!', {
          theme: 'colored',
        });
      });
  };

  const boardTitleHandler = (e) => {
    setBoardTitle(e.target.value);
  };

  return (
    newBoardFormVisibility && (
      <>
        {ReactDOM.createPortal(
          <div
            className={classes['backdrop']}
            onClick={closeCreateBoardFormHandler}></div>,
          document.getElementById('backdrop-root'),
        )}
        <form
          className={classes['new-board-form']}
          onSubmit={createBoardHandler}>
          <div className={classes['new-board-form--header']}>
            <h2>New Workspace</h2>
          </div>
          <div className={classes['new-board-form--body']}>
            <div className={classes['input-group']}>
              <label htmlFor="board-title">Board title *</label>
              <input
                type="text"
                id="board-title"
                autoComplete="off"
                value={boardTitle}
                onChange={boardTitleHandler}
                autoFocus
              />
            </div>
            <div className={classes['background-selection']}>
              {backgrounds.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      background === item
                        ? clsx(
                            classes['background-selection--item'],
                            classes['active'],
                          )
                        : clsx(classes['background-selection--item'])
                    }
                    style={
                      item
                        ? {
                            background: `url(${item}) center/cover no-repeat`,
                          }
                        : { background: '#f3f4f8' }
                    }
                    onClick={() => {
                      setBackground(item);
                    }}>
                    <DoneIcon />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes['new-board-form--footer']}>
            <button onClick={closeCreateBoardFormHandler} type="button">
              Cancel
            </button>
            <button type="submit">Create Workspace</button>
          </div>
        </form>
      </>
    )
  );
}
