import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';
import clsx from 'clsx';
import classes from './Tasks.module.scss';
import BoardsList from '../../components/BoardsList/BoardsList';
import AddBoardForm from '../../components/AddBoardForm/AddBoardForm';

export default function Tasks({ sideBarVisibility, onSideBarShow }) {
  const [newBoardFormVisibility, setNewBoardFormVisibility] = useState(false);

  const tasksContainerClassName = clsx(classes['tasks-container'], {
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
      <section className={tasksContainerClassName}>
        <BoardsList onNewBoardFormShow={setNewBoardFormVisibility} />
        <AddBoardForm
          newBoardFormVisibility={newBoardFormVisibility}
          onNewBoardFormShow={setNewBoardFormVisibility}
        />
      </section>
    </React.Fragment>
  );
}
