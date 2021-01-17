import 'react-calendar/dist/Calendar.css';

import { CircularProgress, List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import api from '../../../api';
import { putItem } from '../../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';
import { useFilePickerDialog } from './Schedule/FilePickerDialog';

const CalendarPicker = ({ item }) => {
  const dispatch = useDispatch();
  const [calendars, setCalendars] = useState(null);
  const [openDialog, FilePickerDialog] = useFilePickerDialog();

  useEffect(() => {
    api('GET', 'calendars').then((data) => {
      if (Array.isArray(data)) setCalendars(data);
    });
  }, []);

  return (
    <List>
      <FilePickerDialog />
      {/* <input
        type='file'
        id='file-selector'
        multiple={false}
        accept='.ics'></input> */}
      <ListItem
        button
        onClick={() => {
          openDialog();
          // dispatch(putItem({ id: item.id, type: item.type, google: c.id }));
        }}>
        Add from file
      </ListItem>
      {calendars ? (
        calendars.map((c) => (
          <ListItem
            button
            onClick={() => {
              dispatch(putItem({ id: item.id, type: item.type, google: c.id }));
            }}
            key={c.id}>
            {c.summary}
          </ListItem>
        ))
      ) : (
        <CircularProgress />
      )}
    </List>
  );
};

export default CalendarPicker;
