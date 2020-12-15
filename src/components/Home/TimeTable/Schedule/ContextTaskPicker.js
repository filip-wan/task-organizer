import { Item, Menu, Submenu } from 'react-contexify';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React from 'react';
import { putItem } from '../../../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';

export const ContextTaskPicker = ({ id, props, todos, event, timetable }) => {
  const dispatch = useDispatch();

  const onItemClick = (todo, item) => {
    dispatch(
      putItem({
        id: timetable.id,
        type: timetable.type,
        events: timetable.events.map((e) =>
          e._id === event._id
            ? { ...e, connections: [...e.connections, item._id] }
            : e
        ),
      })
    );
  };

  return (
    <Menu id={id} theme='dark'>
      {todos?.map((todo) => (
        <Submenu key={todo.id} label={todo.title}>
          {todo.items?.map((item) => (
            <Item
              disabled={event.connections.includes(item._id)}
              key={item._id}
              onClick={() => onItemClick(todo, item)}>
              {item.state ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              {item.text}
            </Item>
          ))}
        </Submenu>
      ))}
    </Menu>
  );
};
export default ContextTaskPicker;
