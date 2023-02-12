import React from 'react';
import classes from './BackgroundSelection.module.scss';
import clsx from 'clsx';
import DoneIcon from '@mui/icons-material/Done';

export default function BackgroundSelection({
  background,
  setBackground,
  toggleBackgroundSelection,
  onUpdateBackground,
  setBoard,
}) {
  const backgrounds = [
    null,
    '/images/board-background-1.jpg',
    '/images/board-background-2.jpg',
    '/images/board-background-3.jpg',
    '/images/board-background-4.jpg',
  ];

  return (
    <React.Fragment>
      <div
        className={classes['backdrop']}
        onClick={toggleBackgroundSelection}></div>
      <div className={classes['background-selection--container']}>
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
                  setBoard((prev) => {
                    const updatedBoard = { ...prev };
                    updatedBoard.background = item;

                    return updatedBoard;
                  });
                }}>
                <DoneIcon />
              </div>
            );
          })}
        </div>
        <div className={classes['btn-group']}>
          <button onClick={toggleBackgroundSelection}>Cancel</button>
          <button
            onClick={() => {
              onUpdateBackground();
              toggleBackgroundSelection();
            }}>
            OK
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
