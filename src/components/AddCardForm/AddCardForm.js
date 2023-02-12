import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import cardApi from '../../store/actions/api/card';
import classes from './AddCardForm.module.scss';

export default function AddCardForm({
  addCardFormVisibility,
  toggleAddCardForm,
  listId,
  list,
  setLists,
  setBoard,
}) {
  const [newCardTitle, setNewCardTitle] = useState('');
  const newCardInputRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (newCardInputRef && newCardInputRef.current) {
      newCardInputRef.current.focus();
    }
  }, [addCardFormVisibility]);

  const newCardTitleChangeHandler = (e) => setNewCardTitle(e.target.value);

  const addNewCardHandler = (e) => {
    e.preventDefault();
    if (!newCardTitle) {
      newCardInputRef.current.focus();
      toast.error('Please enter card title!', { theme: 'colored' });
      return;
    }
    if (newCardTitle.length >= 1 && newCardTitle.length < 3) {
      newCardInputRef.current.focus();
      toast.error('Card title must be at least 3 characters long.', {
        theme: 'colored',
      });
      return;
    }
    const payload = {
      title: newCardTitle,
      boardId: id,
      listId,
    };
    const addCard = {
      _id: Math.floor(Math.random() * 18081998),
      title: newCardTitle,
      boardId: id,
      listId,
    };
    const newList = JSON.parse(JSON.stringify(list));
    newList.cards.unshift(addCard);
    newList.cardsOrder.unshift(addCard._id);
    let newLists = [];
    setLists((prev) => {
      newLists = [...prev];
      const index = newLists.findIndex((list) => list._id === newList._id);
      newLists[index] = newList;
      return newLists;
    });
    setNewCardTitle('');
    toggleAddCardForm();

    cardApi
      .createCard(payload)
      .then((data) => {
        const { newCard, updatedList } = data;
        if (newCard && updatedList) {
          let newLists = [];
          setLists((prev) => {
            newLists = [...prev];
            const index = newLists.findIndex(
              (list) => list._id === updatedList._id,
            );
            newLists[index].cardsOrder.shift();
            newLists[index].cardsOrder.unshift(newCard._id);
            newLists[index].cards.shift();
            newLists[index].cards.unshift(newCard);

            return newLists;
          });
          setBoard((prev) => ({
            ...prev,
            lists: newLists,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again!', {
          theme: 'colored',
        });
      });
  };

  return (
    <form className={classes['add-card-form']} onSubmit={addNewCardHandler}>
      <input
        type="text"
        placeholder="Enter card title..."
        ref={newCardInputRef}
        onChange={newCardTitleChangeHandler}
        value={newCardTitle}
      />
      <div className={classes['btn-group']}>
        <button type="submit">OK</button>
        <button onClick={toggleAddCardForm} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
