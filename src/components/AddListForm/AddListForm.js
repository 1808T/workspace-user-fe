import { useEffect, useRef, useState } from 'react';
import listApi from '../../store/actions/api/list';
import classes from './AddListForm.module.scss';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function AddListForm({ setLists, setBoard }) {
  const [formVisibility, setFormVisibility] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const newListInputRef = useRef(null);
  const { id } = useParams();

  const toggleFormHandler = () => {
    setFormVisibility(!formVisibility);
  };

  const newListTitleChangeHandler = (e) => {
    setNewListTitle(e.target.value);
  };

  const addNewListHandler = (e) => {
    e.preventDefault();
    if (!newListTitle) {
      newListInputRef.current.focus();
      toast.error('Please enter list title.', { theme: 'colored' });
      return;
    }

    if (newListTitle.length >= 1 && newListTitle.length < 3) {
      newListInputRef.current.focus();
      toast.error('List title must be at least 3 characters long.', {
        theme: 'colored',
      });
      return;
    }

    const payload = { title: newListTitle, boardId: id };

    let newLists = [];
    const addList = {
      _id: Math.floor(Math.random() * 18081998),
      title: newListTitle,
      boardId: id,
      cardsOrder: [],
      cards: [],
    };
    setLists((prev) => {
      newLists = [...prev, addList];
      return newLists;
    });
    setBoard((prev) => {
      let listsOrder = [...prev.listsOrder];
      listsOrder.push(addList._id);

      return {
        ...prev,
        lists: newLists,
        listsOrder,
      };
    });
    setNewListTitle('');
    toggleFormHandler();

    listApi
      .createList(payload)
      .then((data) => {
        const { newList, updatedBoard } = data;
        if (newList && updatedBoard) {
          let newLists = [];
          setLists((prev) => {
            newLists = [...prev];
            newLists.pop();
            newLists.push(newList);

            return newLists;
          });
          setBoard((prev) => ({
            ...prev,
            lists: newLists,
            listsOrder: updatedBoard.listsOrder,
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

  useEffect(() => {
    if (newListInputRef && newListInputRef.current) {
      newListInputRef.current.focus();
    }
  }, [formVisibility]);

  const showFormBtnClassName = clsx(classes['add-list-form--btn'], {
    [classes['hide-btn']]: formVisibility,
  });

  const addListFormClassName = clsx(classes['add-list-form--content'], {
    [classes['show']]: formVisibility,
  });

  return (
    <form className={classes['add-list-form']} onSubmit={addNewListHandler}>
      <button
        className={showFormBtnClassName}
        type="button"
        onClick={toggleFormHandler}>
        <h3>Add List</h3>
      </button>
      <div className={addListFormClassName}>
        <input
          type="text"
          placeholder="Enter list title..."
          ref={newListInputRef}
          onChange={newListTitleChangeHandler}
          value={newListTitle}
        />
        <div className={classes['btn-group']}>
          <button type="submit">OK</button>
          <button onClick={toggleFormHandler} type="button">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
