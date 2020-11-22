import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import { Card, TextField } from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';

import { putItem } from '../../store/slices/itemsSlice';

const TimeTable = ({ item }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 10,
      }}>
      <TextField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={() => {
          if (item.title !== title)
            dispatch(putItem({ id: item.id, type: item.type, title }));
        }}
        value={title}
        color='secondary'
        style={{ width: '100%' }}
      />

      <Calendar style={{ width: '100%' }} />
    </Card>
  );
};

export default TimeTable;
