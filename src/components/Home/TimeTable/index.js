import 'react-calendar/dist/Calendar.css';

import { Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import Schedule from './Schedule';
import { makeStyles } from '@material-ui/core/styles';
import { putItem } from '../../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';

const TimeTable = ({ item }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(item.title || '');
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
      <Schedule item={item} />
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
  },
});

export default TimeTable;
