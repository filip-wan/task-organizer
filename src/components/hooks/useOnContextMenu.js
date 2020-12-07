import 'react-contexify/dist/ReactContexify.css';

import { ContextMenu } from '../common/ContextMenu';
import React from 'react';
import { useContextMenu } from 'react-contexify';

export const useOnContextMenu = (id, props = {}) => {
  const { show } = useContextMenu({
    id: id || `${props?.item?.type}_${props?.item?.id}`,
    props: props,
  });

  const onContextMenu = (e) => {
    if (!e.ctrlKey)
      show(e, {
        position: {
          x: e.pageX,
          y: e.pageY,
        },
      });
  };

  const contextMenu = (params) => (
    <ContextMenu
      {...{
        id: id || `${props?.item?.type}_${props?.item?.id}`,
        ...params,
        props: props || {},
      }}
    />
  );

  return [onContextMenu, contextMenu];
};
