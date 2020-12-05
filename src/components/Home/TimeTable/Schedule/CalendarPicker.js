import 'react-calendar/dist/Calendar.css';

import {
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  List,
  ListItem,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import api from '../../../../api';
import { makeStyles } from '@material-ui/core/styles';
import { putItem } from '../../../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';

const CalendarPicker = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [calendars, setCalendars] = useState(null);

  useEffect(() => {
    api(
      'GET',
      'calendars'
      // (data) => setCalendar(data)
    ).then((data) => setCalendars(data));
  }, []);

  return calendars ? (
    <List>
      {calendars.map((c) => (
        <ListItem
          button
          onClick={() => {
            dispatch(putItem({ id: item.id, type: item.type, google: c.id }));
          }}
          key={c.id}>
          {c.summary}
        </ListItem>
      ))}
    </List>
  ) : (
    <CircularProgress />
  );
};

const useStyles = makeStyles({
  schedule: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  item: {
    margin: '10px 0px',
    width: '100%',
    padding: 0,
  },
  itemCard: {
    height: '100%',
    width: '100%',
    padding: 8,
  },
});

export default CalendarPicker;
