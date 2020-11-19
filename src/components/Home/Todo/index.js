import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, List, TextField } from '@material-ui/core';

import { putItem } from '../../../store/slices/itemsSlice';
import TodoItem from './TodoItem';

const Todo = ({ item }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [descriptionVisible, setDescriptionVisible] = useState(
    !!item.description
  );

  console.log(item, 'ITEM');
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
      <div
        style={{
          overflow: 'auto',
          width: '100%',
          height: '100%',
        }}>
        {descriptionVisible && (
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onBlur={() => {
              if (item.description !== description)
                dispatch(
                  putItem({ id: item.id, type: item.type, description })
                );
              if (!description) setDescriptionVisible(false);
            }}
            variant='outlined'
            value={description}
            color='secondary'
            multiline
            style={{
              marginTop: 10,
              width: '100%',
            }}
          />
        )}
        <List>
          {item.items.map((value) => (
            <TodoItem item={item} todoItem={value} key={value?._id} />
          ))}
          <TodoItem isNew item={item} />
        </List>
      </div>
    </Card>
  );
};

export default Todo;
