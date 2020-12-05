import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const CustomCalendar = () => {
  const classes = useStyles();

  return (
    <div className={classes.timeTable}>
      <Calendar />
    </div>
  );
};

const useStyles = makeStyles({
  timeTable: {
    height: '100%',
    width: '100%',
    '& .react-calendar': {
      borderRadius: '0 0 10px 10px',
      border: 'none',
      width: 'auto',
      background: '#ffffff11',
    },
  },
});

export default CustomCalendar;
