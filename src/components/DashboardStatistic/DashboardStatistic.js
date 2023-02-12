import { useEffect, useState } from 'react';
import boardApi from '../../store/actions/api/board';
import cardApi from '../../store/actions/api/card';
import classes from './DashboardStatistic.module.scss';

export default function DashboardStatistic() {
  const weeklyDoneCardsInitialState = {
    currentWeekDoneCards: 0,
    lastWeekDoneCards: 0,
  };
  const [weeklyDoneCards, setWeeklyDoneCards] = useState(
    weeklyDoneCardsInitialState,
  );
  useEffect(() => {
    cardApi.getWeeklyDoneCards().then((data) => {
      const { weeklyDoneCards } = data;
      setWeeklyDoneCards(weeklyDoneCards);
    });
  }, []);

  const weeklyNewCardsInitialState = {
    currentWeekNewCards: 0,
    lastWeekNewCards: 0,
  };
  const [weeklyNewCards, setWeeklyNewCards] = useState(
    weeklyNewCardsInitialState,
  );
  useEffect(() => {
    cardApi.getWeeklyNewCards().then((data) => {
      const { weeklyNewCards } = data;
      setWeeklyNewCards(weeklyNewCards);
    });
  }, []);

  const completedBoardsInitialState = {
    currentYearDoneBoards: 0,
    lastYearDoneBoards: 0,
  };
  const [completedBoards, setCompletedBoards] = useState(
    completedBoardsInitialState,
  );
  useEffect(() => {
    boardApi.fetchCompletedBoards().then((data) => {
      const { completedBoards } = data;
      setCompletedBoards(completedBoards);
    });
  }, []);

  return (
    <div className={classes['statistic']}>
      <div className={classes['statistic--task-completed']}>
        <div className={classes['title']}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="#F3F7FD" />
            <path
              d="M25.8529 15.0977C25.7997 14.9436 25.7029 14.8081 25.5742 14.7079C25.4455 14.6076 25.2905 14.5469 25.128 14.533L20.3318 13.8334L18.1824 9.4755C18.1134 9.33298 18.0056 9.2128 17.8714 9.1287C17.7373 9.0446 17.5821 9 17.4238 9C17.2654 9 17.1103 9.0446 16.9761 9.1287C16.8419 9.2128 16.7342 9.33298 16.6652 9.4755L14.5157 13.8249L9.71954 14.533C9.56353 14.5552 9.41687 14.6206 9.29618 14.7219C9.1755 14.8232 9.08563 14.9564 9.03678 15.1062C8.99206 15.2526 8.98804 15.4084 9.02517 15.5569C9.06229 15.7054 9.13915 15.841 9.2475 15.9491L12.7287 19.3207L11.8858 24.1085C11.8557 24.2665 11.8715 24.4299 11.9312 24.5792C11.991 24.7286 12.0922 24.8577 12.223 24.9514C12.3505 25.0425 12.5008 25.0963 12.6571 25.1068C12.8135 25.1172 12.9696 25.0838 13.1081 25.0104L17.4238 22.7598L21.7226 25.0188C21.8409 25.0856 21.9746 25.1204 22.1104 25.12C22.2889 25.1206 22.4631 25.0646 22.6077 24.9598C22.7385 24.8662 22.8397 24.737 22.8995 24.5877C22.9592 24.4383 22.975 24.275 22.9449 24.1169L22.102 19.3292L25.5832 15.9575C25.7049 15.8544 25.7948 15.7189 25.8426 15.5667C25.8903 15.4145 25.8939 15.2519 25.8529 15.0977ZM20.669 18.4694C20.5701 18.565 20.4962 18.6834 20.4536 18.8141C20.411 18.9449 20.401 19.0841 20.4246 19.2196L21.0315 22.7514L17.8621 21.0656C17.7401 21.0006 17.6041 20.9667 17.4659 20.9667C17.3278 20.9667 17.1917 21.0006 17.0698 21.0656L13.9004 22.7514L14.5073 19.2196C14.5308 19.0841 14.5209 18.9449 14.4783 18.8141C14.4357 18.6834 14.3617 18.565 14.2628 18.4694L11.7341 15.9407L15.2828 15.4265C15.4193 15.4075 15.5491 15.3553 15.6608 15.2745C15.7725 15.1936 15.8627 15.0866 15.9234 14.9629L17.4238 11.7514L19.0085 14.9713C19.0692 15.0951 19.1593 15.2021 19.271 15.2829C19.3827 15.3637 19.5125 15.4159 19.6491 15.4349L23.1977 15.9491L20.669 18.4694Z"
              fill="#8D98A9"
            />
          </svg>
          <h3>Task completed</h3>
          <h2>{weeklyDoneCards.currentWeekDoneCards}</h2>
        </div>
        <div className={classes['content']}>
          <div className={classes['content--img']}>
            <svg
              width="133"
              height="69"
              viewBox="0 0 133 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_2_54)">
                <path
                  d="M9 46.7573C9.43233 46.9655 10.2525 47.3237 15.2624 42.7925C21.5248 37.1285 27.2178 33.1638 33.4802 38.2613C39.7426 43.3589 43.7277 55.8196 51.698 52.4213C59.6683 49.0229 62.5149 23.535 72.1931 20.1367C81.8713 16.7383 88.1337 36.5622 94.9653 25.8006C101.797 15.0391 109.198 1.44568 114.322 3.14487C118.421 4.50422 122.482 10.1305 124 12.7737"
                  stroke="#5051F9"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_2_54"
                  x="0.565918"
                  y="0.998535"
                  width="132.301"
                  height="68.0015"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="7" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.313725 0 0 0 0 0.317647 0 0 0 0 0.976471 0 0 0 0.4 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2_54"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2_54"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className={classes['content--text']}>
            <p>
              {weeklyDoneCards.lastWeekDoneCards}+ more <br /> from last week
            </p>
          </div>
        </div>
      </div>
      <div className={classes['statistic--new-task']}>
        <div className={classes['title']}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="#F3F7FD" />
            <path
              d="M15 15.4H15.8C16.0122 15.4 16.2157 15.3157 16.3657 15.1657C16.5157 15.0157 16.6 14.8122 16.6 14.6C16.6 14.3878 16.5157 14.1843 16.3657 14.0343C16.2157 13.8843 16.0122 13.8 15.8 13.8H15C14.7878 13.8 14.5843 13.8843 14.4343 14.0343C14.2843 14.1843 14.2 14.3878 14.2 14.6C14.2 14.8122 14.2843 15.0157 14.4343 15.1657C14.5843 15.3157 14.7878 15.4 15 15.4ZM15 17C14.7878 17 14.5843 17.0843 14.4343 17.2343C14.2843 17.3843 14.2 17.5878 14.2 17.8C14.2 18.0122 14.2843 18.2157 14.4343 18.3657C14.5843 18.5157 14.7878 18.6 15 18.6H19.8C20.0122 18.6 20.2157 18.5157 20.3657 18.3657C20.5157 18.2157 20.6 18.0122 20.6 17.8C20.6 17.5878 20.5157 17.3843 20.3657 17.2343C20.2157 17.0843 20.0122 17 19.8 17H15ZM23.8 14.552C23.7917 14.4785 23.7756 14.4061 23.752 14.336V14.264C23.7135 14.1817 23.6622 14.1061 23.6 14.04L18.8 9.24C18.7339 9.17777 18.6583 9.12646 18.576 9.088C18.5521 9.08461 18.5279 9.08461 18.504 9.088C18.4227 9.04139 18.333 9.01148 18.24 9H13.4C12.7635 9 12.153 9.25286 11.7029 9.70294C11.2529 10.153 11 10.7635 11 11.4V22.6C11 23.2365 11.2529 23.847 11.7029 24.2971C12.153 24.7471 12.7635 25 13.4 25H21.4C22.0365 25 22.647 24.7471 23.0971 24.2971C23.5471 23.847 23.8 23.2365 23.8 22.6V14.6C23.8 14.6 23.8 14.6 23.8 14.552ZM19 11.728L21.072 13.8H19.8C19.5878 13.8 19.3843 13.7157 19.2343 13.5657C19.0843 13.4157 19 13.2122 19 13V11.728ZM22.2 22.6C22.2 22.8122 22.1157 23.0157 21.9657 23.1657C21.8157 23.3157 21.6122 23.4 21.4 23.4H13.4C13.1878 23.4 12.9843 23.3157 12.8343 23.1657C12.6843 23.0157 12.6 22.8122 12.6 22.6V11.4C12.6 11.1878 12.6843 10.9843 12.8343 10.8343C12.9843 10.6843 13.1878 10.6 13.4 10.6H17.4V13C17.4 13.6365 17.6529 14.247 18.1029 14.6971C18.553 15.1471 19.1635 15.4 19.8 15.4H22.2V22.6ZM19.8 20.2H15C14.7878 20.2 14.5843 20.2843 14.4343 20.4343C14.2843 20.5843 14.2 20.7878 14.2 21C14.2 21.2122 14.2843 21.4157 14.4343 21.5657C14.5843 21.7157 14.7878 21.8 15 21.8H19.8C20.0122 21.8 20.2157 21.7157 20.3657 21.5657C20.5157 21.4157 20.6 21.2122 20.6 21C20.6 20.7878 20.5157 20.5843 20.3657 20.4343C20.2157 20.2843 20.0122 20.2 19.8 20.2Z"
              fill="#8D98A9"
            />
          </svg>
          <h3>New Task</h3>
          <h2>{weeklyNewCards.currentWeekNewCards}</h2>
        </div>
        <div className={classes['content']}>
          <div className={classes['content--img']}>
            <svg
              width="133"
              height="69"
              viewBox="0 0 133 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_2_65)">
                <path
                  d="M9 46.7573C9.43233 46.9655 10.2525 47.3237 15.2624 42.7925C21.5248 37.1285 27.2178 33.1638 33.4802 38.2613C39.7426 43.3589 43.7277 55.8196 51.698 52.4213C59.6683 49.0229 62.5149 23.535 72.1931 20.1367C81.8713 16.7383 88.1337 36.5622 94.9653 25.8006C101.797 15.0391 109.198 1.44568 114.322 3.14487C118.421 4.50422 122.482 10.1305 124 12.7737"
                  stroke="#1EA7FF"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_2_65"
                  x="0.565918"
                  y="0.998535"
                  width="132.301"
                  height="68.0015"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="7" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.117647 0 0 0 0 0.654902 0 0 0 0 1 0 0 0 0.4 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2_65"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2_65"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className={classes['content--text']}>
            <p>
              {weeklyNewCards.lastWeekNewCards}+ more <br /> from last week
            </p>
          </div>
        </div>
      </div>
      <div className={classes['statistic--project-done']}>
        <div className={classes['title']}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="#F3F7FD" />
            <path
              d="M19.8 18.6H15C14.7878 18.6 14.5843 18.6843 14.4343 18.8343C14.2843 18.9843 14.2 19.1878 14.2 19.4C14.2 19.6122 14.2843 19.8157 14.4343 19.9657C14.5843 20.1157 14.7878 20.2 15 20.2H19.8C20.0122 20.2 20.2157 20.1157 20.3657 19.9657C20.5157 19.8157 20.6 19.6122 20.6 19.4C20.6 19.1878 20.5157 18.9843 20.3657 18.8343C20.2157 18.6843 20.0122 18.6 19.8 18.6ZM19.8 15.4H16.6C16.3878 15.4 16.1843 15.4843 16.0343 15.6343C15.8843 15.7843 15.8 15.9878 15.8 16.2C15.8 16.4122 15.8843 16.6157 16.0343 16.7657C16.1843 16.9157 16.3878 17 16.6 17H19.8C20.0122 17 20.2157 16.9157 20.3657 16.7657C20.5157 16.6157 20.6 16.4122 20.6 16.2C20.6 15.9878 20.5157 15.7843 20.3657 15.6343C20.2157 15.4843 20.0122 15.4 19.8 15.4ZM21.4 10.6H20.456C20.2909 10.1332 19.9855 9.7288 19.5817 9.44235C19.1778 9.1559 18.6952 9.00139 18.2 9H16.6C16.1048 9.00139 15.6222 9.1559 15.2183 9.44235C14.8145 9.7288 14.5091 10.1332 14.344 10.6H13.4C12.7635 10.6 12.153 10.8529 11.7029 11.3029C11.2529 11.753 11 12.3635 11 13V22.6C11 23.2365 11.2529 23.847 11.7029 24.2971C12.153 24.7471 12.7635 25 13.4 25H21.4C22.0365 25 22.647 24.7471 23.0971 24.2971C23.5471 23.847 23.8 23.2365 23.8 22.6V13C23.8 12.3635 23.5471 11.753 23.0971 11.3029C22.647 10.8529 22.0365 10.6 21.4 10.6ZM15.8 11.4C15.8 11.1878 15.8843 10.9843 16.0343 10.8343C16.1843 10.6843 16.3878 10.6 16.6 10.6H18.2C18.4122 10.6 18.6157 10.6843 18.7657 10.8343C18.9157 10.9843 19 11.1878 19 11.4V12.2H15.8V11.4ZM22.2 22.6C22.2 22.8122 22.1157 23.0157 21.9657 23.1657C21.8157 23.3157 21.6122 23.4 21.4 23.4H13.4C13.1878 23.4 12.9843 23.3157 12.8343 23.1657C12.6843 23.0157 12.6 22.8122 12.6 22.6V13C12.6 12.7878 12.6843 12.5843 12.8343 12.4343C12.9843 12.2843 13.1878 12.2 13.4 12.2H14.2V13C14.2 13.2122 14.2843 13.4157 14.4343 13.5657C14.5843 13.7157 14.7878 13.8 15 13.8H19.8C20.0122 13.8 20.2157 13.7157 20.3657 13.5657C20.5157 13.4157 20.6 13.2122 20.6 13V12.2H21.4C21.6122 12.2 21.8157 12.2843 21.9657 12.4343C22.1157 12.5843 22.2 12.7878 22.2 13V22.6Z"
              fill="#8D98A9"
            />
          </svg>
          <h3>Project Done</h3>
          <h2>{completedBoards.currentYearDoneBoards}</h2>
        </div>
        <div className={classes['content']}>
          <div className={classes['content--img']}>
            <svg
              width="133"
              height="69"
              viewBox="0 0 133 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_2_76)">
                <path
                  d="M9 46.7573C9.43233 46.9655 10.2525 47.3237 15.2624 42.7925C21.5248 37.1285 27.2178 33.1638 33.4802 38.2613C39.7426 43.3589 43.7277 55.8196 51.698 52.4213C59.6683 49.0229 62.5149 23.535 72.1931 20.1367C81.8713 16.7383 88.1337 36.5622 94.9653 25.8006C101.797 15.0391 109.198 1.44568 114.322 3.14487C118.421 4.50422 122.482 10.1305 124 12.7737"
                  stroke="#FF614C"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_2_76"
                  x="0.565918"
                  y="0.998535"
                  width="132.301"
                  height="68.0015"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="7" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0.380392 0 0 0 0 0.298039 0 0 0 0.4 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2_76"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2_76"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className={classes['content--text']}>
            <p>
              {completedBoards.lastYearDoneBoards}+ more <br /> from last year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
