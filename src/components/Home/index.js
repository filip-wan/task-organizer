import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectSlice } from '../../store';
import {
  fetchAllItems,
  itemsSlice,
  postItem,
} from '../../store/slices/itemsSlice';
import { login, userSlice } from '../../store/slices/userSlice';
import Item from './Item';
import Note from './Note';
import TimeTable from './TimeTable';
import Todo from './Todo/index.js';

const Home = () => {
  const dispatch = useDispatch();
  const user = selectSlice(userSlice)();
  const items = selectSlice(itemsSlice)();
  const [loginRedirect, setLoginRedirect] = useState(false);

  useEffect(() => {
    dispatch(login()).then(
      (e) => e.payload?.success && dispatch(fetchAllItems())
    );
  }, [dispatch]);

  useEffect(() => {
    setLoginRedirect(!(user.authorized ?? true));
  }, [user.authorized]);

  return (
    <div>
      {loginRedirect && <Redirect to='login' />}
      <Button
        onClick={(e) =>
          dispatch(
            postItem({
              type: 'note',
              position: { x: 20, y: 20 },
              size: { height: 400, width: 200 },
            })
          )
        }>
        Add Note
      </Button>
      <Button
        onClick={(e) =>
          dispatch(
            postItem({
              type: 'todo',
              position: { x: 20, y: 20 },
              size: { height: 400, width: 200 },
            })
          )
        }>
        Add Todo
      </Button>
      <Button
        onClick={(e) =>
          dispatch(
            postItem({
              type: 'timeTable',
              position: { x: 20, y: 20 },
              size: { height: 400, width: 200 },
            })
          )
        }>
        Add TimeTable
      </Button>
      {items.map((item) => (
        <Item item={item} key={item.id}>
          {item.type === 'note' && <Note item={item} />}
          {item.type === 'todo' && <Todo item={item} />}
          {item.type === 'timeTable' && <TimeTable item={item} />}
        </Item>
      ))}
    </div>
  );
};

export default Home;
