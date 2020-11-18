import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { selectSlice } from '../../store';
import {
  itemsSlice,
  fetchAllItems,
  postItem,
} from '../../store/slices/itemsSlice';
import Item from './Item';
import Note from './Note';

const Home = () => {
  const dispatch = useDispatch();
  const items = selectSlice(itemsSlice)();

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  return (
    <div>
      <a href='http://localhost:3002/auth/github'>
        <Button type={'github'} label={'Login with Github'} height={50}>
          Github
        </Button>
      </a>
      <a href='http://localhost:3002/auth/facebook'>
        <Button type={'github'} label={'Login with Github'} height={50}>
          Facebook
        </Button>
      </a>
      <a href='http://localhost:3002/logout'>
        <Button type={'github'} label={'Login with Github'} height={50}>
          logout
        </Button>
      </a>
      <Button
        onClick={(e) =>
          dispatch(
            postItem({
              type: 'note',
              name: 'Karol',
              position: { x: 20, y: 20 },
              size: { height: 400, width: 500 },
            })
          )
        }>
        Add Me
      </Button>
      {items.map((item) => (
        <Item item={item} key={item.id}>
          {item.type === 'note' && <Note item={item} />}
        </Item>
      ))}
    </div>
  );
};

export default Home;
