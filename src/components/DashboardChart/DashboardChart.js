import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Tooltip,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import cardApi from '../../store/actions/api/card';
import { toShortMonth } from '../../utils/convert-date';
import classes from './DashboardChart.module.scss';

export default function DashboardChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    cardApi.getMonthlyCards().then((data) => {
      const { monthlyCards } = data;
      const monthlyCardsArray = [];
      for (const key in monthlyCards) {
        if (monthlyCards.hasOwnProperty(key)) {
          monthlyCardsArray.push({
            month: toShortMonth(key),
            ...monthlyCards[key],
          });
        }
      }
      setData(monthlyCardsArray);
    });
  }, []);

  return (
    <div className={classes['chart']}>
      <div className={classes['chart--title']}>
        <h2>Task Done</h2>
        <h2>Monthly</h2>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width="100%"
          height="100%"
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient
              id="color-done-tasks-area"
              x1="0"
              y1="0"
              x2="0"
              y2="1">
              <stop offset="5%" stopColor="#5051F9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5051F9" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient
              id="color-all-tasks-area"
              x1="0"
              y1="0"
              x2="0"
              y2="1">
              <stop offset="5%" stopColor="#5051F9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5051F9" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid vertical={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="doneTasks"
            name="Complete Tasks"
            stroke="#5051F9"
            fillOpacity={1}
            fill="url(#color-done-tasks-area)"
            dot={{ fill: '#5051F9' }}
          />
          <Area
            type="monotone"
            dataKey="allTasks"
            name="All Tasks"
            stroke="#5051F9"
            fillOpacity={1}
            fill="url(#color-all-tasks-area)"
            dot={{ fill: '#5051F9' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
