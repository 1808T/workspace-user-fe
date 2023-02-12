import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './utils/RequireAuth';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Tasks from './pages/Tasks/Tasks';
import TaskDetail from './pages/TaskDetail/TaskDetail';
import Settings from './pages/Settings/Settings';
import Messages from './pages/Messages/Messages';
import UserInfo from './pages/UserInfo/UserInfo';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const [sideBarVisibility, setSideBarVisibility] = useState(false);

  return (
    <main className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />

        {/* public routes */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                sideBarVisibility={sideBarVisibility}
                onSideBarShow={setSideBarVisibility}
              />
            }
          />
          <Route
            path="tasks"
            element={
              <Tasks
                sideBarVisibility={sideBarVisibility}
                onSideBarShow={setSideBarVisibility}
              />
            }
          />
          <Route path="tasks">
            <Route
              path=":id"
              element={
                <TaskDetail
                  sideBarVisibility={sideBarVisibility}
                  onSideBarShow={setSideBarVisibility}
                />
              }
            />
          </Route>
          <Route
            path="settings"
            element={
              <Settings
                sideBarVisibility={sideBarVisibility}
                onSideBarShow={setSideBarVisibility}
              />
            }
          />
          <Route
            path="messages"
            element={
              <Messages
                sideBarVisibility={sideBarVisibility}
                onSideBarShow={setSideBarVisibility}
              />
            }
          />
          <Route
            path="user/:id"
            element={
              <UserInfo
                sideBarVisibility={sideBarVisibility}
                onSideBarShow={setSideBarVisibility}
              />
            }
          />
        </Route>

        {/* catch other routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
