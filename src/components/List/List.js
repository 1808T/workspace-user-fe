import { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './List.module.scss';
import clsx from 'clsx';
import mapOrder from '../../utils/map-order';
import Card from '../Card/Card';
import { Container, Draggable } from 'react-smooth-dnd';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import AddCardForm from '../AddCardForm/AddCardForm';
import listApi from '../../store/actions/api/list';
import {
  selectTextHandler,
  saveContentAfterPressEnter,
} from '../../utils/content-editable';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function List({
  list,
  listId,
  onCardDrop,
  setLists,
  setBoard,
  members,
  owner,
  currentLists,
}) {
  const cards = mapOrder(list.cards, list.cardsOrder, '_id');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [addCardFormVisibility, setAddCardFormVisibility] = useState(false);

  let prevListTitle = list.title;
  const [listTitle, setListTitle] = useState(prevListTitle);

  const listTitleChangeHandler = (e) => {
    setListTitle(e.target.value);
  };

  const listTitleBlurHandler = () => {
    if (listTitle === prevListTitle) return;
    const payload = { title: listTitle };
    listApi.updateList(listId, payload);
  };

  const deleteListHandler = () => {
    listApi.deleteList(listId).then(() => {
      let newLists = [];
      setLists((prev) => {
        newLists = [...prev].filter((list) => list._id !== listId);
        return newLists;
      });
      setBoard((prev) => {
        const index = [...prev.listsOrder].indexOf(listId);
        const newListsOrder = [...prev.listsOrder].splice(index, 1);

        return {
          ...prev,
          lists: newLists,
          listsOrder: newListsOrder,
        };
      });
    });
  };

  const toggleModal = () => setModalVisibility(!modalVisibility);

  const toggleAddCardForm = () =>
    setAddCardFormVisibility(!addCardFormVisibility);

  const listHeaderClassName = clsx(
    'column-drag-handle',
    classes['list--header'],
  );

  return (
    <>
      <article className={classes['list']}>
        <div className={listHeaderClassName}>
          <input
            type="text"
            spellCheck="false"
            onClick={selectTextHandler}
            onChange={listTitleChangeHandler}
            onBlur={listTitleBlurHandler}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            value={listTitle}
            className={classes['editable-title']}
          />
          <div className={classes['btn-group']}>
            <button onClick={toggleModal}>
              <DeleteIcon />
            </button>
            <button onClick={toggleAddCardForm}>
              <AddIcon />
            </button>
          </div>
        </div>
        <div className={classes['list--body']}>
          {addCardFormVisibility && (
            <AddCardForm
              addCardFormVisibility={addCardFormVisibility}
              toggleAddCardForm={toggleAddCardForm}
              listId={listId}
              list={list}
              setLists={setLists}
              setBoard={setBoard}
            />
          )}
          <Container
            groupName="list"
            orientation="vertical"
            onDrop={(dropResult) => onCardDrop(list._id, dropResult)}
            getChildPayload={(index) => cards[index]}
            dragClass={classes['card-ghost']}
            dropClass={classes['card-ghost-drop']}
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: classes['card-drop-preview'],
            }}
            dropPlaceholderAnimationDuration={200}>
            {cards &&
              cards.map((card) => (
                <Draggable key={card._id}>
                  <Card
                    list={list}
                    card={card}
                    listTitle={list.title}
                    setLists={setLists}
                    members={members}
                    owner={owner}
                    setBoard={setBoard}
                    currentLists={currentLists}
                  />
                </Draggable>
              ))}
          </Container>
        </div>
      </article>
      {ReactDOM.createPortal(
        <ConfirmModal
          modalVisibility={modalVisibility}
          toggleModal={toggleModal}
          title="Delete List"
          content={`Are you sure want to delete <strong>${list.title}</strong> ? </br> (All related cards will also be deleted)`}
          onAction={deleteListHandler}
        />,
        document.getElementById('modal-root'),
      )}
    </>
  );
}
