import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Dashboard.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';
import DashboardStatistic from '../../components/DashboardStatistic/DashboardStatistic';
import DashboardChart from '../../components/DashboardChart/DashboardChart';
import DashboardProgress from '../../components/DashboardProgress/DashboardProgress';
import DashboardMessage from '../../components/DashBoardMessage/DashboardMessage';
import clsx from 'clsx';

export default function Dashboard({ sideBarVisibility, onSideBarShow }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  const dashboardContainerClassName = clsx(classes['dashboard-container'], {
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
      <section className={dashboardContainerClassName}>
        <div className={classes['dashboard-stats']}>
          <DashboardStatistic />
          <DashboardChart />
          <DashboardProgress />
        </div>
        <div className={classes['dashboard-message']}>
          <DashboardMessage />
        </div>
      </section>
    </React.Fragment>
  );
}
