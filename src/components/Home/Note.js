import { Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import { putItem } from '../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';

const Note = ({ item }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(item.title || '');
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

      <TextField
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        onBlur={() => {
          if (item.description !== description)
            dispatch(putItem({ id: item.id, type: item.type, description }));
        }}
        variant='outlined'
        value={description}
        color='secondary'
        multiline
        style={{
          marginTop: 10,
          width: '100%',
          height: '100%',
        }}
        InputProps={{
          style: {
            height: '100%',
          },
        }}
        inputProps={{
          style: {
            height: '100%',
            overflow: 'auto',
          },
        }}
      />
    </Card>
  );
};

export default Note;
