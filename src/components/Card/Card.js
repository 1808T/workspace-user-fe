import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CardDetail from './CardDetail';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import classes from './Card.module.scss';
import cardApi from '../../store/actions/api/card';
import { toast } from 'react-toastify';
import { Avatar } from '@mui/material';
import { convertToDate2 } from '../../utils/convert-date';
import { useNavigate } from 'react-router-dom';

export default function Card({
  card,
  listTitle,
  setLists,
  setBoard,
  members,
  owner,
}) {
  const navigate = useNavigate();
  const [cardDetailVisibility, setCardDetailVisibility] = useState(false);
  const [isCompleted, setIsCompleted] = useState(card.isCompleted);
  const { _id } = JSON.parse(localStorage.getItem('user'));

  const toggleCardDetail = () => {
    setCardDetailVisibility(!cardDetailVisibility);
  };

  const deleteCardHandler = () => {
    const currentCardId = card._id;
    let listIndex = -1;
    let newLists = [];
    let newCardsOrder = [];
    setLists((prev) => {
      newLists = [...prev];
      listIndex = newLists.findIndex((list) =>
        list.cardsOrder.includes(currentCardId),
      );
      const newCards = newLists[listIndex].cards.filter(
        (card) => card._id !== currentCardId,
      );
      newLists[listIndex].cards = newCards;
      newCardsOrder = newCards.map((card) => card._id);

      return newLists;
    });
    setBoard((prev) => {
      const updatedBoard = { ...prev };
      updatedBoard.lists = newLists;

      return updatedBoard;
    });

    cardApi.deleteCard(currentCardId, newCardsOrder).catch((error) => {
      console.log(error);
      toast.error('Something went wrong. Please try again!', {
        theme: 'colored',
      });
    });
  };

  const changeCardCompleteStatusHandler = () => {
    const currentCardId = card._id;
    setIsCompleted(!isCompleted);
    let listIndex = -1;
    let newLists = [];
    setLists((prev) => {
      newLists = [...prev];
      listIndex = newLists.findIndex((list) =>
        list.cardsOrder.includes(currentCardId),
      );
      const cardIndex = newLists[listIndex].cards.findIndex(
        (card) => card._id === currentCardId,
      );
      newLists[listIndex].cards[cardIndex].isCompleted = !isCompleted;

      return newLists;
    });
    setBoard((prev) => {
      const updatedBoard = { ...prev };
      updatedBoard.lists = newLists;

      return updatedBoard;
    });
    const payload = { isCompleted: !isCompleted };
    cardApi.updateCard(currentCardId, payload).catch((error) => {
      console.log(error);
      toast.error('Something went wrong. Please try again!', {
        theme: 'colored',
      });
    });
  };

  return (
    <div className={classes['card']}>
      <button
        className={classes['card--close-btn']}
        onClick={deleteCardHandler}>
        <CloseIcon />
      </button>
      <button className={classes['card--edit-btn']} onClick={toggleCardDetail}>
        <EditIcon />
      </button>
      {card.cover && (
        <div
          className={classes['card--cover']}
          style={{
            backgroundImage: `url(${card.cover})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}></div>
      )}
      <h4>{card.title}</h4>
      {card.description && (
        <p className={classes['card--description']}>{card.description}</p>
      )}
      {card.endedAt && (
        <div className={classes['card--end-date']}>
          <p>{convertToDate2(card.endedAt)}</p>
        </div>
      )}
      <div className={classes['card--in-charge']}>
        {isCompleted ? (
          <div>
            <span>Done</span>
            <button
              onClick={changeCardCompleteStatusHandler}
              className={classes['complete']}>
              <CheckCircleRoundedIcon />
            </button>
          </div>
        ) : (
          <div>
            <span>Pending</span>
            <button onClick={changeCardCompleteStatusHandler}>
              <AccessTimeFilledRoundedIcon />
            </button>
          </div>
        )}

        {card.inCharge && (
          <>
            {!card.inCharge.avatar ? (
              <Avatar
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (card.inCharge._id === _id) {
                    return navigate('/settings');
                  }
                  navigate(`/user/${card.inCharge._id}`);
                }}>
                {card.inCharge.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                alt="in-charge-user-avatar"
                src={card.inCharge.avatar}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (card.inCharge._id === _id) {
                    return navigate('/settings');
                  }
                  navigate(`/user/${card.inCharge._id}`);
                }}
              />
            )}
          </>
        )}
      </div>
      {cardDetailVisibility &&
        ReactDOM.createPortal(
          <CardDetail
            card={card}
            members={members}
            owner={owner}
            listTitle={listTitle}
            setLists={setLists}
            toggleCardDetail={toggleCardDetail}
          />,
          document.getElementById('card-detail-root'),
        )}
    </div>
  );
}
