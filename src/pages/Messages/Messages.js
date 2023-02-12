import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';

export default function Messages({ sideBarVisibility, onSideBarShow }) {
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
      <h1>Messages</h1>
    </React.Fragment>
  );
}
