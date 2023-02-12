import { useEffect, useState } from 'react';
import boardApi from '../../store/actions/api/board';
import classes from './DashboardProgress.module.scss';

export default function DashboardProgress() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    boardApi.fetchBoardProgress().then((data) => {
      const { boards } = data;
      if (boards) {
        boards.forEach((board, index) => {
          const doneCards = board.cards.filter(
            (card) => card.isCompleted === true,
          ).length;
          const allCards = board.cards.length;
          if (allCards === 0) {
            boards[index].progress = '0%';
            delete boards[index].cards;
            return;
          }
          boards[index].progress =
            Math.floor((doneCards / allCards) * 100) + '%';
          delete boards[index].cards;
        });
        setBoards(boards);
      }
    });
  }, []);

  return (
    <div className={classes['progress']}>
      <h2>Task</h2>
      {boards &&
        boards.length !== 0 &&
        boards.map((board) => {
          return (
            <div className={classes['progress--task']} key={board._id}>
              <div className={classes['start']}>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.57084 5.14251C9.21818 5.53091 9.21818 6.46909 8.57084 6.85749L1.5145 11.0913C0.847973 11.4912 4.72364e-07 11.0111 5.0634e-07 10.2338L8.76472e-07 1.76619C9.10448e-07 0.988895 0.847972 0.508782 1.5145 0.908697L8.57084 5.14251Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className={classes['time--container']}>
                <p>Start from</p>
                <div className={classes['time']}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.7 8.1H9.9V4.5C9.9 4.2613 9.80518 4.03239 9.6364 3.8636C9.46762 3.69482 9.2387 3.6 9 3.6C8.76131 3.6 8.53239 3.69482 8.36361 3.8636C8.19482 4.03239 8.1 4.2613 8.1 4.5V9C8.1 9.23869 8.19482 9.46761 8.36361 9.63639C8.53239 9.80518 8.76131 9.9 9 9.9H11.7C11.9387 9.9 12.1676 9.80518 12.3364 9.63639C12.5052 9.46761 12.6 9.23869 12.6 9C12.6 8.7613 12.5052 8.53238 12.3364 8.3636C12.1676 8.19482 11.9387 8.1 11.7 8.1ZM9 0C7.21997 0 5.47991 0.527841 3.99987 1.51677C2.51983 2.50571 1.36628 3.91131 0.685088 5.55585C0.00389956 7.20038 -0.17433 9.00998 0.172936 10.7558C0.520203 12.5016 1.37737 14.1053 2.63604 15.364C3.89471 16.6226 5.49836 17.4798 7.24419 17.8271C8.99002 18.1743 10.7996 17.9961 12.4442 17.3149C14.0887 16.6337 15.4943 15.4802 16.4832 14.0001C17.4722 12.5201 18 10.78 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 0 9 0ZM9 16.2C7.57598 16.2 6.18393 15.7777 4.9999 14.9866C3.81586 14.1954 2.89302 13.0709 2.34807 11.7553C1.80312 10.4397 1.66054 8.99201 1.93835 7.59535C2.21616 6.19868 2.9019 4.91577 3.90883 3.90883C4.91577 2.90189 6.19869 2.21616 7.59535 1.93835C8.99201 1.66053 10.4397 1.80312 11.7553 2.34807C13.0709 2.89302 14.1954 3.81586 14.9866 4.99989C15.7777 6.18393 16.2 7.57597 16.2 9C16.2 10.9096 15.4414 12.7409 14.0912 14.0912C12.7409 15.4414 10.9096 16.2 9 16.2Z"
                      fill="#94A2BC"
                    />
                  </svg>
                  <span>
                    {new Date(board.createdAt)
                      .toDateString()
                      .split(' ')
                      .slice(1)
                      .join(' ')}
                  </span>
                </div>
              </div>
              <div className={classes['title-container']}>
                <div className={classes['title']}>
                  <h3>{board.title}</h3>
                </div>
                <div className={classes['progress-bar--container']}>
                  <h4>{board.progress} Complete</h4>
                  <div className={classes['progress-bar']}>
                    <div className={classes['progress-bar--total']}></div>
                    <div
                      className={classes['progress-bar--done']}
                      style={{ width: `${board.progress}` }}></div>
                  </div>
                </div>
                <button>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.3 6.09L15.21 5.19C15.3983 5.0017 15.5041 4.7463 15.5041 4.48C15.5041 4.2137 15.3983 3.9583 15.21 3.77C15.0217 3.5817 14.7663 3.47591 14.5 3.47591C14.2337 3.47591 13.9783 3.5817 13.79 3.77L12.89 4.68C11.4886 3.59585 9.76687 3.00764 7.99503 3.00764C6.22318 3.00764 4.50147 3.59585 3.10003 4.68L2.19003 3.76C2.0004 3.5717 1.74373 3.46644 1.47649 3.46737C1.20925 3.46831 0.95333 3.57537 0.765026 3.765C0.576722 3.95463 0.471462 4.2113 0.472399 4.47854C0.473337 4.74578 0.580396 5.0017 0.770026 5.19L1.69003 6.1C0.593042 7.49755 -0.00218316 9.22334 2.6229e-05 11C-0.00323946 12.2754 0.29849 13.5331 0.88005 14.6683C1.46161 15.8034 2.30614 16.783 3.34322 17.5254C4.38029 18.2679 5.57985 18.7516 6.84184 18.9362C8.10383 19.1208 9.39168 19.0011 10.598 18.5869C11.8043 18.1727 12.8941 17.4761 13.7764 16.5552C14.6588 15.6342 15.3082 14.5157 15.6705 13.2928C16.0328 12.0699 16.0974 10.7781 15.859 9.52514C15.6206 8.27219 15.0861 7.0944 14.3 6.09ZM8.00003 17C6.81334 17 5.6533 16.6481 4.6666 15.9888C3.67991 15.3295 2.91087 14.3925 2.45675 13.2961C2.00262 12.1997 1.8838 10.9933 2.11531 9.82946C2.34683 8.66557 2.91827 7.59647 3.75739 6.75736C4.5965 5.91824 5.6656 5.3468 6.82948 5.11529C7.99337 4.88378 9.19977 5.0026 10.2961 5.45672C11.3925 5.91085 12.3296 6.67988 12.9888 7.66658C13.6481 8.65327 14 9.81331 14 11C14 12.5913 13.3679 14.1174 12.2427 15.2426C11.1174 16.3679 9.59133 17 8.00003 17ZM6.00003 2H10C10.2652 2 10.5196 1.89464 10.7071 1.70711C10.8947 1.51957 11 1.26522 11 1C11 0.734784 10.8947 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0H6.00003C5.73481 0 5.48046 0.105357 5.29292 0.292893C5.10538 0.48043 5.00003 0.734784 5.00003 1C5.00003 1.26522 5.10538 1.51957 5.29292 1.70711C5.48046 1.89464 5.73481 2 6.00003 2ZM9.00003 8C9.00003 7.73478 8.89467 7.48043 8.70713 7.29289C8.5196 7.10536 8.26524 7 8.00003 7C7.73481 7 7.48046 7.10536 7.29292 7.29289C7.10538 7.48043 7.00003 7.73478 7.00003 8V9.89C6.7736 10.0925 6.614 10.359 6.54235 10.6542C6.47069 10.9495 6.49037 11.2595 6.59877 11.5433C6.70717 11.8271 6.89918 12.0712 7.14939 12.2435C7.39961 12.4158 7.69624 12.508 8.00003 12.508C8.30381 12.508 8.60044 12.4158 8.85066 12.2435C9.10088 12.0712 9.29289 11.8271 9.40129 11.5433C9.50968 11.2595 9.52936 10.9495 9.45771 10.6542C9.38606 10.359 9.22646 10.0925 9.00003 9.89V8Z" />
                  </svg>
                  Reminder
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
