import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, TextField, Checkbox } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { putItem } from '../../../store/slices/itemsSlice';

const TodoItem = ({ item, todoItem, isNew }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(todoItem?.text ?? '');
  const [state, setState] = useState(todoItem?.state ?? false);

  const saveItem = () => {
    if ((todoItem?.text ?? '') !== text) {
      dispatch(
        putItem({
          id: item.id,
          type: item.type,
          items: isNew
            ? [...item.items, { text, state }]
            : item.items
                .map((v) =>
                  v._id === todoItem._id
                    ? !!text && { ...todoItem, text, state }
                    : v
                )
                .filter((v) => v !== false),
        })
      );
    }
    isNew && setState(false);
    isNew && setText('');
  };

  return (
    <ListItem
      style={{
        paddingLeft: 0,
        paddingRight: isNew ? '2.2em' : 0,
        width: '100%',
      }}>
      <Checkbox
        checked={state}
        onClick={(e) => {
          setState(!state);
          !isNew &&
            dispatch(
              putItem({
                id: item.id,
                type: item.type,
                items: item.items.map((v) =>
                  v._id === todoItem._id
                    ? { ...todoItem, text, state: !state }
                    : v
                ),
              })
            );
        }}
        color='default'
      />
      <TextField
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onBlur={saveItem}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            saveItem();
            e.target?.parentElement?.parentElement?.parentElement?.nextElementSibling?.children[1]?.firstElementChild?.firstElementChild?.focus();
          }
        }}
        style={{ width: '100%' }}
        color='secondary'
        placeholder='New Todo Item'
      />
      {!isNew && (
        <CloseIcon
          style={{
            cursor: 'pointer',
            width: '1em',
            marginLeft: '.2em',
            color: '#ffffff66',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#f44336')}
          onMouseLeave={(e) => (e.target.style.color = '#ffffff66')}
          onClick={() =>
            dispatch(
              putItem({
                id: item.id,
                type: item.type,
                items: item.items.filter((v) => v._id !== todoItem._id),
              })
            )
          }
        />
      )}
    </ListItem>
  );
};

export default TodoItem;
