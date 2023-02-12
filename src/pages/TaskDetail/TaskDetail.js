import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';
import clsx from 'clsx';
import classes from './TaskDetail.module.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Container, Draggable } from 'react-smooth-dnd';
import boardApi from '../../store/actions/api/board';
import listApi from '../../store/actions/api/list';
import cardApi from '../../store/actions/api/card';
import mapOrder from '../../utils/map-order';
import isEmptyObj from '../../utils/is-empty-obj';
import applyDrag from '../../utils/drag-n-drop';
import compareArrays from '../../utils/compare-arrays';
import List from '../../components/List/List';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddListForm from '../../components/AddListForm/AddListForm';
import BoardMembersForm from '../../components/BoardMembers/BoardMembers';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import BackgroundSelection from '../../components/BackgroundSelection/BackgroundSelection';
import SearchCardDetail from '../../components/SearchCardDetail/SearchCardDetail';
import { toast } from 'react-toastify';

export default function TaskDetail({ sideBarVisibility, onSideBarShow }) {
  const [query] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [members, setMembers] = useState([]);
  const [background, setBackground] = useState(null);
  const [isCompleted, setIsCompleted] = useState(null);
  const [backgroundSelectionVisibility, setBackgroundSelectionVisibility] =
    useState(false);
  const [membersFormVisibility, setMembersFormVisibility] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [more, setMore] = useState(false);
  const [searchedCardDetail, setSearchedCardDetail] = useState({});
  const [searchedCardDetailVisibility, setSearchedCardDetailVisibility] =
    useState(false);
  const [searchedListTitle, setSearchedListTitle] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  const toggleMembersForm = () =>
    setMembersFormVisibility(!membersFormVisibility);

  const toggleMore = () => setMore(!more);

  const toggleModal = () => setModalVisibility(!modalVisibility);

  const toggleBackgroundSelection = () =>
    setBackgroundSelectionVisibility(!backgroundSelectionVisibility);

  const changeList = useRef({
    listFromId: null,
    listFromCardsOrder: null,
    listToId: null,
    listToCardsOrder: null,
    cardId: null,
  });

  useEffect(() => {
    boardApi.fetchBoardDetail(id).then((data) => {
      setBoard(data.board);
      if (query.get('cardId')) {
        const result = data.board.lists
          .map((list) => {
            return list.cards.find((card) => card._id === query.get('cardId'));
          })
          .filter((element) => element !== undefined)[0];
        const listTitle = data.board.lists.find(
          (list) => list._id === result.listId,
        ).title;
        setSearchedListTitle(listTitle);
        setSearchedCardDetail(result);
        setSearchedCardDetailVisibility(true);
      }
    });
  }, [id, query]);

  useEffect(() => {
    if (!isEmptyObj(board)) {
      setLists(mapOrder(board.lists, board.listsOrder, '_id'));
      setMembers(board.members);
      setBackground(board.background);
      setIsCompleted(board.isCompleted);
    }
  }, [board]);

  const onColumnDrop = (dropResult) => {
    const reOrderedLists = applyDrag([...lists], dropResult);
    let prevListsOrder = board.listsOrder;
    setLists(reOrderedLists);
    setBoard((prev) => {
      const updatedBoard = { ...prev };
      updatedBoard.lists = reOrderedLists;
      const listsOrder = [];
      reOrderedLists.forEach((list) => {
        listsOrder.push(list._id);
      });
      updatedBoard.listsOrder = listsOrder;

      return updatedBoard;
    });
    const newListsOrder = [];
    reOrderedLists.forEach((list) => {
      newListsOrder.push(list._id);
    });
    if (!compareArrays(prevListsOrder, newListsOrder)) {
      const payload = { listsOrder: newListsOrder };
      boardApi.updateBoard(id, payload);
    }
  };

  const onCardDrop = (listId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let reOrderedLists = [...lists];
      let currentList = reOrderedLists.find((list) => list._id === listId);
      currentList.cards = applyDrag(currentList.cards, dropResult);
      currentList.cardsOrder = currentList.cards.map((card) => card._id);
      setLists(reOrderedLists);
      setBoard((prev) => {
        const updatedBoard = { ...prev };
        updatedBoard.lists = reOrderedLists;

        return updatedBoard;
      });

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        // Move card inside list
        if (dropResult.removedIndex === dropResult.addedIndex) {
          return;
        }
        const payload = { cardsOrder: currentList.cardsOrder };
        listApi.updateList(listId, payload).catch(() => {
          toast.error('Something went wrong. Please try again.', {
            theme: 'colored',
          });
        });
      } else {
        // Move card to other list
        if (dropResult.addedIndex === null) {
          changeList.current.listFromId = listId;
          changeList.current.listFromCardsOrder = currentList.cardsOrder;
        }
        if (dropResult.removedIndex === null) {
          changeList.current.listToId = listId;
          changeList.current.listToCardsOrder = currentList.cardsOrder;
          const currentCard = JSON.parse(JSON.stringify(dropResult.payload));
          changeList.current.cardId = currentCard._id;
        }
        if (
          changeList.current.listFromId !== null &&
          changeList.current.listToId !== null
        ) {
          const payload = {
            listFromId: changeList.current.listFromId,
            listFromCardsOrder: changeList.current.listFromCardsOrder,
            listToId: changeList.current.listToId,
            listToCardsOrder: changeList.current.listToCardsOrder,
            cardId: changeList.current.cardId,
          };
          cardApi.moveCardToOtherList(payload).then(() => {
            changeList.current = {
              listFromId: null,
              listFromCardsOrder: [],
              listToId: null,
              listToCardsOrder: [],
              cardId: null,
            };
          });
        }
      }
    }
  };

  const updateBackgroundHandler = () => {
    const payload = { background };
    boardApi.updateBoard(id, payload);
  };

  const deleteBoardHandler = () => {
    toggleMore();
    boardApi.deleteBoard(id).then(() => {
      navigate('/tasks');
    });
  };

  const changeBoardStatusHandler = () => {
    toggleMore();
    setIsCompleted(!isCompleted);
    const payload = { isCompleted: !board.isCompleted };
    boardApi.updateBoard(id, payload);
  };

  const leaveBoardHandler = () => {
    toggleMore();
    boardApi.leaveBoard(id).then(() => {
      navigate('/tasks');
    });
  };

  const taskDetailContainerClassName = clsx(classes['task-detail-container'], {
    [classes['show-side-bar']]: sideBarVisibility,
  });

  return (
    <React.Fragment>
      <NavBar
        sideBarVisibility={sideBarVisibility}
        onSideBarShow={onSideBarShow}
      />
      <Sidebar
        sideBarVisibility={sideBarVisibility}
        onSideBarShow={onSideBarShow}
      />
      <section
        className={taskDetailContainerClassName}
        style={
          background
            ? {
                background: `url(${background}) center/cover no-repeat`,
              }
            : { background: '#f3f4f8' }
        }>
        <div className={classes['task-detail--header']}>
          <div className={classes['title']}>
            <h1>
              {board.title} ({isCompleted ? 'Completed' : 'In progress'})
            </h1>
            <button type="button" onClick={toggleMore}>
              <MoreHorizIcon />
            </button>
            {more && (
              <div className={classes['dropdown']}>
                <button
                  onClick={() => {
                    toggleBackgroundSelection();
                    toggleMore();
                  }}>
                  Change background
                </button>
                <button onClick={changeBoardStatusHandler}>
                  Change board status
                </button>
                {userId === board.owner[0]._id ? (
                  <button
                    onClick={() => {
                      toggleMore();
                      toggleModal();
                    }}>
                    Delete board
                  </button>
                ) : (
                  <button onClick={leaveBoardHandler}>Leave Board</button>
                )}
              </div>
            )}
          </div>
          {!isEmptyObj(board) && (
            <div className={classes['members']}>
              {!board.owner[0].avatar ? (
                <Avatar>{board.owner[0].username[0].toUpperCase()}</Avatar>
              ) : (
                <Avatar alt="user-avatar" src={board.owner[0].avatar} />
              )}
              {members && members.length !== 0 && (
                <span>+{members.length}</span>
              )}
              <button onClick={toggleMembersForm}>
                <AddIcon />
              </button>
            </div>
          )}
        </div>
        <div className={classes['board-list--container']}>
          <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            dragHandleSelector=".column-drag-handle"
            getChildPayload={(index) => lists[index]}
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: classes['list-drop-preview'],
            }}>
            {lists &&
              lists.map((list) => (
                <Draggable key={list._id}>
                  <List
                    list={list}
                    listId={list._id}
                    onCardDrop={onCardDrop}
                    setLists={setLists}
                    setBoard={setBoard}
                    members={members}
                    owner={board.owner[0]}
                    currentLists={lists}
                  />
                </Draggable>
              ))}
          </Container>
          <AddListForm lists={lists} setLists={setLists} setBoard={setBoard} />
        </div>
      </section>
      {membersFormVisibility &&
        ReactDOM.createPortal(
          <BoardMembersForm
            members={members}
            owner={board.owner[0]}
            setMembers={setMembers}
            onMembersFormShow={toggleMembersForm}
            setBoard={setBoard}
          />,
          document.getElementById('modal-root'),
        )}
      {ReactDOM.createPortal(
        <ConfirmModal
          modalVisibility={modalVisibility}
          toggleModal={toggleModal}
          title="Delete Board"
          content={`Are you sure want to delete <strong>${board.title}</strong> ? </br> (All related lists & cards will also be deleted)`}
          onAction={deleteBoardHandler}
        />,
        document.getElementById('modal-root'),
      )}
      {backgroundSelectionVisibility &&
        ReactDOM.createPortal(
          <BackgroundSelection
            toggleBackgroundSelection={toggleBackgroundSelection}
            background={background}
            setBackground={setBackground}
            onUpdateBackground={updateBackgroundHandler}
            setBoard={setBoard}
          />,
          document.getElementById('modal-root'),
        )}
      {searchedCardDetailVisibility &&
        ReactDOM.createPortal(
          <SearchCardDetail
            card={searchedCardDetail}
            listTitle={searchedListTitle}
            setLists={setLists}
            members={members}
            owner={board.owner[0]}
            setSearchedCardDetailVisibility={setSearchedCardDetailVisibility}
          />,
          document.getElementById('card-detail-root'),
        )}
    </React.Fragment>
  );
}
