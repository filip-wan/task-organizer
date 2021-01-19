import React, { useEffect, useState } from 'react';
import {
  categoriesSlice,
  fetchCategories,
} from '../../store/slices/categoriesSlice';
import {
  fetchAllItems,
  itemsSlice,
  postItem,
} from '../../store/slices/itemsSlice';
import { login, userSlice } from '../../store/slices/userSlice';

import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import Item from './Item';
import Note from './Note';
import { Redirect } from 'react-router-dom';
import TimeTable from './TimeTable';
import Todo from './Todo';
import { selectSlice } from '../../store';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const user = selectSlice(userSlice)();
  const items = selectSlice(itemsSlice)();

  const [loginRedirect, setLoginRedirect] = useState(false);
  const categories = selectSlice(categoriesSlice)();
  const selectedCategories =
    categories.filter((c) => c.toggled).map((c) => c.id) || [];

  useEffect(() => {
    dispatch(login()).then((e) => {
      if (e.payload?.success) {
        dispatch(fetchCategories());
        dispatch(fetchAllItems());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setLoginRedirect(!(user.authorized ?? true));
  }, [user.authorized]);

  return (
    <div>
      {loginRedirect && <Redirect to='login' />}
      <div>
        <Fab
          color='secondary'
          style={{ margin: '10px 5px' }}
          onClick={(e) =>
            dispatch(
              postItem({
                type: 'note',
                position: { x: 20, y: 20 },
                size: { height: 400, width: 200 },
              })
            )
          }
          size='medium'
          variant='extended'>
          <AddIcon />
          Note
        </Fab>
        <Fab
          color='secondary'
          style={{ margin: '10px 5px' }}
          onClick={(e) =>
            dispatch(
              postItem({
                type: 'todo',
                position: { x: 20, y: 20 },
                size: { height: 400, width: 200 },
              })
            )
          }
          size='medium'
          variant='extended'>
          <AddIcon />
          Todo
        </Fab>
        <Fab
          color='secondary'
          style={{ margin: '10px 5px' }}
          onClick={(e) =>
            dispatch(
              postItem({
                type: 'timeTable',
                position: { x: 20, y: 20 },
                size: { height: 400, width: 800 },
              })
            )
          }
          size='medium'
          variant='extended'>
          <AddIcon />
          TimeTable
        </Fab>
      </div>
      {items
        .filter(
          (i) =>
            !selectedCategories.length > 0 ||
            selectedCategories.some((c) => i.categories.includes(c))
        )
        .map((item) => (
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
