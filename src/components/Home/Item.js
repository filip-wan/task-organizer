import React from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

import { selectSlice } from '../../store';
import { itemsSlice, deleteNote, putNote } from '../../store/slices/itemsSlice';

const Item = ({ item, children }) => {
  const dispatch = useDispatch();
  const items = selectSlice(itemsSlice)();
  console.log(items, '🛅🛅🛅');

  return (
    <Draggable
      onStop={(_e, data) =>
        dispatch(putNote({ id: item.id, position: { x: data.x, y: data.y } }))
      }
      key={item.id}
      cancel='.button-resize'
      defaultPosition={{ ...item.position }}>
      <ResizableBox
        height={item.size.height}
        width={item.size.width}
        onResizeStop={(_e, data) =>
          dispatch(putNote({ id: item.id, size: data.size }))
        }
        handle={
          <button
            className='button-resize'
            style={{
              borderRadius: '40px',
              border: '0px',
              right: 0,
              bottom: 0,
              height: 0,
              width: 0,
              position: 'absolute',
              background: 'none',
              cursor: 'pointer',
              outline: 'none',
              fontSize: 'initial',
            }}>
            🤏
          </button>
        }
        style={{
          border: '2px solid black',
          position: 'absolute',
        }}>
        <>
          <button
            className='button-exit'
            onClick={() => dispatch(deleteNote({ id: item.id }))}
            style={{
              borderRadius: '40px',
              size: '2rem',
              border: '0px',
              right: 0,
              top: '-1rem',
              height: 0,
              width: 0,
              position: 'absolute',
              background: 'none',
              cursor: 'pointer',
              outline: 'none',
              fontSize: 'initial',
            }}>
            ❌
          </button>
          {children}
        </>
      </ResizableBox>
    </Draggable>
  );
};

export default Item;
