import React, { useState } from 'react';
import {
  selectTextHandler,
  saveContentAfterPressEnter,
} from '../../utils/content-editable';
import cardApi from '../../store/actions/api/card';
import classes from './SearchCardDetail.module.scss';
import { Avatar } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../Loading/Loading';
import { convertToDate1 } from '../../utils/convert-date';
import HTMLReactParser from 'html-react-parser';

export default function SearchCardDetail({
  setSearchedCardDetailVisibility,
  card,
  setLists,
  members,
  owner,
  listTitle,
}) {
  let prevCardTitle = card.title;
  const [cardTitle, setCardTitle] = useState(prevCardTitle);
  let inChargeUser = card.inCharge;
  const [inCharge, setInCharge] = useState(inChargeUser);
  let endDateInitialState = new Date(card.endedAt);
  endDateInitialState = convertToDate1(endDateInitialState);
  const [endDate, setEndDate] = useState(endDateInitialState);
  const [cardCover, setCardCover] = useState(card.cover);
  let prevCardDescription = card.description || '';
  const [cardDescription, setCardDescription] = useState(prevCardDescription);
  const [membersVisibility, setMembersVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardTitleChangeHandler = (e) => {
    setCardTitle(e.target.value);
  };

  const inChargeChangeHandler = (userId) => {
    const payload = { inCharge: userId };
    const currentCardId = card._id;
    const currentListId = card.listId;

    cardApi.updateCard(currentCardId, payload).then((data) => {
      const { inCharge } = data.updatedCard;
      setInCharge(inCharge);

      setLists((prev) => {
        const newLists = [...prev];
        const listIndex = newLists.findIndex(
          (list) => list._id === currentListId,
        );
        const cardIndex = newLists[listIndex].cards.findIndex(
          (card) => card._id === currentCardId,
        );
        newLists[listIndex].cards[cardIndex].inCharge = inCharge;

        return newLists;
      });
    });
  };

  const inChargeDeleteHandler = () => {
    setInCharge(null);
    const payload = { inCharge: null };
    const currentCardId = card._id;
    const currentListId = card.listId;

    cardApi.updateCard(currentCardId, payload).then((data) => {
      setLists((prev) => {
        const newLists = [...prev];
        const listIndex = newLists.findIndex(
          (list) => list._id === currentListId,
        );
        const cardIndex = newLists[listIndex].cards.findIndex(
          (card) => card._id === currentCardId,
        );
        newLists[listIndex].cards[cardIndex].inCharge = null;

        return newLists;
      });
    });
  };

  const endDateChangeHandler = (e) => {
    setEndDate(e.target.value);
  };

  const cardCoverChangeHandler = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('cover', file);

    const currentCardId = card._id;
    const currentListId = card.listId;
    const payload = {
      cardId: currentCardId,
      formData,
    };
    setLoading(true);
    cardApi
      .uploadCardImage(payload)
      .then((data) => {
        const { cover } = data.updatedCard;
        setCardCover(cover);

        setLists((prev) => {
          const newLists = [...prev];
          const listIndex = newLists.findIndex(
            (list) => list._id === currentListId,
          );
          const cardIndex = newLists[listIndex].cards.findIndex(
            (card) => card._id === currentCardId,
          );
          newLists[listIndex].cards[cardIndex].cover = cover;

          return newLists;
        });
      })
      .finally(() => {
        setLoading(false);
        e.target.value = null;
      });
  };

  const deleteCardCoverHandler = () => {
    setCardCover(null);
    const payload = { cover: null };
    const currentCardId = card._id;
    const currentListId = card.listId;

    cardApi.updateCard(currentCardId, payload).then((data) => {
      setLists((prev) => {
        const newLists = [...prev];
        const listIndex = newLists.findIndex(
          (list) => list._id === currentListId,
        );
        const cardIndex = newLists[listIndex].cards.findIndex(
          (card) => card._id === currentCardId,
        );
        newLists[listIndex].cards[cardIndex].cover = null;

        return newLists;
      });
    });
  };

  const cardDescriptionChangeHandler = (e) => {
    setCardDescription(e.target.value);
  };

  const toggleMembersVisibilityHandler = () => {
    setMembersVisibility(!membersVisibility);
  };

  const cardTitleBlurHandler = () => {
    if (cardTitle === prevCardTitle) return;

    const payload = { title: cardTitle };
    const currentCardId = card._id;
    const currentListId = card.listId;

    cardApi.updateCard(currentCardId, payload).then((data) => {
      setLists((prev) => {
        const newLists = [...prev];
        const listIndex = newLists.findIndex(
          (list) => list._id === currentListId,
        );
        const cardIndex = newLists[listIndex].cards.findIndex(
          (card) => card._id === currentCardId,
        );
        newLists[listIndex].cards[cardIndex].title = cardTitle;

        return newLists;
      });
    });
  };

  const endDateBlurHandler = () => {
    if (endDate === endDateInitialState) return;

    const payload = { endedAt: endDate };
    const currentCardId = card._id;
    const currentListId = card.listId;

    cardApi.updateCard(currentCardId, payload).then((data) => {
      setLists((prev) => {
        const newLists = [...prev];
        const listIndex = newLists.findIndex(
          (list) => list._id === currentListId,
        );
        const cardIndex = newLists[listIndex].cards.findIndex(
          (card) => card._id === currentCardId,
        );
        newLists[listIndex].cards[cardIndex].endedAt = endDate;

        return newLists;
      });
    });
  };

  const cardDescriptionBlurHandler = () => {
    if (cardDescription === prevCardDescription) return;

    const payload = { description: cardDescription };
    const currentCardId = card._id;
    const currentListId = card.listId;

    cardApi.updateCard(card._id, payload).then(() => {
      setLists((prev) => {
        const newLists = [...prev];
        const listIndex = newLists.findIndex(
          (list) => list._id === currentListId,
        );
        const cardIndex = newLists[listIndex].cards.findIndex(
          (card) => card._id === currentCardId,
        );
        newLists[listIndex].cards[cardIndex].description = cardDescription;

        return newLists;
      });
    });
  };

  return (
    <React.Fragment>
      <div
        className={classes['backdrop']}
        onClick={() => {
          setSearchedCardDetailVisibility(false);
        }}></div>
      <div className={classes['card-detail']}>
        <div className={classes['card-detail--header']}>
          <input
            type="text"
            spellCheck="false"
            onClick={selectTextHandler}
            onChange={cardTitleChangeHandler}
            onBlur={cardTitleBlurHandler}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            value={cardTitle}
            className={classes['editable-title']}
          />
          <div className={classes['end-date']}>
            <p>in list {HTMLReactParser(`<u>${listTitle}</u>`)}</p>
            <div>
              <label htmlFor="end-date">Due date: </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={endDateChangeHandler}
                onBlur={endDateBlurHandler}
              />
            </div>
          </div>
          <div className={classes['in-charge']}>
            <p>In charge:</p>
            {inCharge ? (
              <>
                {!inCharge.avatar ? (
                  <Avatar>{inCharge.username[0].toUpperCase()}</Avatar>
                ) : (
                  <Avatar alt="in-charge-user-avatar" src={inCharge.avatar} />
                )}
                <button
                  className={classes['clear-btn']}
                  type="button"
                  onClick={inChargeDeleteHandler}>
                  <CancelRoundedIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className={classes['add-btn']}
                  type="button"
                  onClick={toggleMembersVisibilityHandler}>
                  <AddCircleOutlineRoundedIcon />
                  {membersVisibility && (
                    <div className={classes['members']}>
                      <h3>Board members</h3>
                      <div
                        className={classes['owner']}
                        onClick={() => {
                          inChargeChangeHandler(owner._id);
                        }}>
                        {!owner.avatar ? (
                          <Avatar>{owner.username[0].toUpperCase()}</Avatar>
                        ) : (
                          <Avatar alt="user-avatar" src={owner.avatar} />
                        )}
                        <p>{owner.username} (Owner)</p>
                      </div>
                      {members &&
                        members.map((member) => {
                          const { _id, avatar, username } = member;
                          if (!avatar) {
                            return (
                              <div
                                onClick={() => {
                                  inChargeChangeHandler(_id);
                                }}
                                className={classes['member']}
                                key={member._id}>
                                <Avatar>{username[0].toUpperCase()}</Avatar>
                                <p>{username}</p>
                              </div>
                            );
                          }

                          return (
                            <div
                              className={classes['member']}
                              key={member._id}
                              onClick={() => {
                                inChargeChangeHandler(_id);
                              }}>
                              <Avatar alt="user-avatar" src={avatar} />
                              <p>{username}</p>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        <div className={classes['card-detail--body']}>
          {cardCover ? (
            <div className={classes['img-container']}>
              {loading && <Loading />}
              <button
                className={classes['clear-img-btn']}
                onClick={deleteCardCoverHandler}>
                <CloseIcon />
              </button>
              <img
                src={cardCover}
                alt="card-cover"
                width="100%"
                height="auto"
              />
              <div className={classes['card-detail--change-img']}>
                <label htmlFor="card-cover">Change image: </label>
                <input
                  type="file"
                  id="card-cover"
                  accept="image/*"
                  onChange={cardCoverChangeHandler}
                />
              </div>
            </div>
          ) : (
            <div className={classes['card-detail--change-img']}>
              {loading && <Loading />}
              <label htmlFor="card-cover">Upload image: </label>
              <input
                type="file"
                id="card-cover"
                accept="image/*"
                onChange={cardCoverChangeHandler}
              />
            </div>
          )}
          <div className={classes['card-detail--description']}>
            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              value={cardDescription}
              onClick={selectTextHandler}
              onChange={cardDescriptionChangeHandler}
              onBlur={cardDescriptionBlurHandler}
              onMouseDown={(e) => {
                e.preventDefault();
              }}></textarea>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
