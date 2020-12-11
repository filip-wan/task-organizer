import 'react-calendar/dist/Calendar.css';

import { CircularProgress, List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import api from '../../../api';
import { putItem } from '../../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';

const CalendarPicker = ({ item }) => {
  const dispatch = useDispatch();
  const [calendars, setCalendars] = useState(null);

  useEffect(() => {
    api('GET', 'calendars').then((data) => setCalendars(data));
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

export default CalendarPicker;
