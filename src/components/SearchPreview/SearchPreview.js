import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classes from './SearchPreview.module.scss';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import cardApi from '../../store/actions/api/card';
import boardApi from '../../store/actions/api/board';

export default function SearchPreview({ query, closeSearchPreviewHandler }) {
  const navigate = useNavigate();
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchedBoards, setSearchedBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (query.length > 0) {
        setLoading(true);
        const payload = { query };
        await cardApi.searchCards(payload).then((data) => {
          setSearchedCards(data.searchedCards);
        });

        await boardApi.searchBoard(payload).then((data) => {
          setSearchedBoards(data.searchedBoards);
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      setLoading(false);
      setSearchedCards([]);
      setSearchedBoards([]);
    };
  }, [query]);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className={classes['backdrop']}
          onClick={closeSearchPreviewHandler}></div>,
        document.getElementById('backdrop-root'),
      )}
      <div className={classes['search-preview']}>
        {loading && <Loading />}
        {searchedCards && searchedCards.length === 0 ? (
          <></>
        ) : (
          <div className={classes['search-preview--cards']}>
            <h4>Cards</h4>
            {!searchedCards && (
              <div className={classes['no-cards']}>
                <AssignmentIcon />
                <p>No card found.</p>
              </div>
            )}
            {searchedCards &&
              searchedCards.map((card) => (
                <div
                  key={card._id}
                  onClick={() => {
                    navigate(`/tasks/${card.boardId}?cardId=${card._id}`);
                    closeSearchPreviewHandler();
                  }}
                  className={classes['search-preview--cards--item']}>
                  <AssignmentIcon />
                  <p>{card.title}</p>
                </div>
              ))}
          </div>
        )}
        {searchedBoards && searchedBoards.length === 0 ? (
          <></>
        ) : (
          <div className={classes['search-preview--boards']}>
            <h4>Boards</h4>
            {!searchedBoards && (
              <div className={classes['no-boards']}>
                <CallToActionIcon />
                <p>No board found.</p>
              </div>
            )}
            {searchedBoards &&
              searchedBoards.map((board) => (
                <div
                  key={board._id}
                  onClick={() => {
                    navigate(`/tasks/${board._id}`);
                    closeSearchPreviewHandler();
                  }}
                  className={classes['search-preview--boards--item']}>
                  <CallToActionIcon />
                  <p>{board.title}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
