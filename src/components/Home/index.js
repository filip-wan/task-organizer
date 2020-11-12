import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { selectSlice } from '../../store';
import { itemsSlice, pushItem } from '../../store/slices/itemsSlice';
import Item from './Item';

const Home = () => {
  const dispatch = useDispatch();
  const items = selectSlice(itemsSlice)();

  return (
    <div>
      <Button
        onClick={(e) =>
          dispatch(
            pushItem({
              name: 'Karol',
              id: items.length,
              position: { x: 0, y: 0 },
              size: { height: 30, width: 500 },
            })
          )
        }>
        Add Me
      </Button>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Home;
