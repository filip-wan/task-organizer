import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import { Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';

import { putItem } from '../../store/slices/itemsSlice';

const TimeTable = ({ item }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [descriptionVisible, setDescriptionVisible] = useState(
    !!item.description
  );
  const classes = useStyles();

  return (
    <Card className={classes.timeTable}>
      <TextField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            !descriptionVisible && setDescriptionVisible(true);
          }
        }}
        onBlur={() => {
          if (item.title !== title)
            dispatch(putItem({ id: item.id, type: item.type, title }));
        }}
        value={title}
        color='secondary'
        style={{ width: '100%' }}
      />
      {descriptionVisible && (
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onBlur={() => {
            if (item.description !== description)
              dispatch(putItem({ id: item.id, type: item.type, description }));
            if (!description) setDescriptionVisible(false);
          }}
          variant='outlined'
          value={description}
          color='secondary'
          multiline
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: '100%',
          }}
        />
      )}
      <Calendar />
    </Card>
  );
};

const useStyles = makeStyles({
  timeTable: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 10,
    '& .react-calendar': {
      borderRadius: '0 0 10px 10px',
      border: 'none',
      width: 'auto',
      background: '#ffffff11',
    },
  },
});

export default TimeTable;
