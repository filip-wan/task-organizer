import React from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import AllOutIcon from '@material-ui/icons/AllOut';
import CloseIcon from '@material-ui/icons/Close';

import { deleteItem, putItem } from '../../store/slices/itemsSlice';

const Item = ({ item, children }) => {
  const dispatch = useDispatch();
  return (
    <Draggable
      onStop={(_e, { x, y }) => {
        if (x !== item.position.x && y !== item.position.y)
          dispatch(
            putItem({ id: item.id, type: item.type, position: { x, y } })
          );
      }}
      key={item.id}
      cancel='.button-resize'
      defaultPosition={{ ...item.position }}>
      <ResizableBox
        minConstraints={[120, 120]}
        height={item.size.height}
        width={item.size.width}
        onResizeStop={(_e, { size }) => {
          if (
            size.width !== item.size.width &&
            size.height !== item.size.height
          )
            dispatch(putItem({ id: item.id, type: item.type, size }));
        }}
        handle={
          <button
            className='button-resize'
            style={{
              borderRadius: '40px',
              border: '0px',
              right: '.4em',
              bottom: '0.6em',
              height: 0,
              width: 0,
              position: 'absolute',
              background: 'none',
              cursor: 'se-resize',
              outline: 'none',
              fontSize: 'initial',
            }}>
            <AllOutIcon color='disabled' />
          </button>
        }
        style={{
          position: 'absolute',
        }}>
        <>
          <button
            className='button-exit'
            onClick={() =>
              dispatch(deleteItem({ id: item.id, type: item.type }))
            }
            style={{
              borderRadius: '40px',
              size: '2rem',
              border: '0px',
              right: '.4em',
              top: '-1rem',
              height: 0,
              width: 0,
              position: 'absolute',
              background: 'none',
              cursor: 'pointer',
              outline: 'none',
              fontSize: 'initial',
            }}>
            <CloseIcon color='error' />
          </button>
          {children}
        </>
      </ResizableBox>
    </Draggable>
  );
};

export default Item;
