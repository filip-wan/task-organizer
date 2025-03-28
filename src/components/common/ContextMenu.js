import { Item, Menu, Separator, Submenu } from 'react-contexify';
import { deleteItem, postItem, putItem } from '../../store/slices/itemsSlice';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/Check';
import LabelIcon from '@material-ui/icons/Label';
import React from 'react';
import { categoriesSlice } from '../../store/slices/categoriesSlice';
import { selectSlice } from '../../store';
import { useDispatch } from 'react-redux';
import { useNewCategoryDialog } from './NewCategoryDialog';
import { useNotificationDialog } from './NotificationDialog';

export const ContextMenu = ({ id, props }) => {
  const dispatch = useDispatch();
  const [openCategoryDialog, NewCategoryDialog] = useNewCategoryDialog();
  const [
    openNotificationDialog,
    NewNotificationDialog,
  ] = useNotificationDialog();
  const categories = selectSlice(categoriesSlice)();

  const onDelete = () => {
    props?.item &&
      dispatch(deleteItem({ id: props?.item.id, type: props?.item.type }));
  };

  const onDuplicate = () => {
    props?.item && dispatch(postItem({ ...props?.item, id: undefined }));
  };

  const onCategoryClick = ({ event }, category) => {
    const oldCategories = props?.item?.categories ?? [];
    const categories = oldCategories.includes(category.id)
      ? oldCategories.filter((c) => c !== category.id)
      : [...oldCategories, category.id];

    dispatch(
      putItem({ id: props?.item.id, type: props?.item.type, categories })
    );

    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  return (
    <>
      <NewCategoryDialog />
      {props?.item?.type === 'todo' && (
        <NewNotificationDialog item={props.item} />
      )}
      <Menu id={id} theme='dark' style={{ position: 'absolute' }}>
        {props?.item?.type === 'todo' && (
          <>
            <Item
              onClick={() => {
                openNotificationDialog();
              }}>
              Deadline
            </Item>
            <Separator />
          </>
        )}
        <Submenu label='Category'>
          {categories.map((c) => (
            <Item key={c.id} onClick={(e) => onCategoryClick(e, c)}>
              <LabelIcon style={{ color: c.color, marginRight: 10 }} />
              {(props?.item?.categories ?? []).includes(c.id) && <CheckIcon />}
              {c.label}
            </Item>
          ))}
          <Item onClick={() => openCategoryDialog(true)}>
            <AddCircleIcon style={{ color: 'white', marginRight: 10 }} />
            New Category
          </Item>
        </Submenu>
        <Separator />
        <Item hidden={!props?.item} onClick={onDuplicate}>
          Duplicate
        </Item>
        <Item hidden={!props?.item} onClick={onDelete}>
          Delete
        </Item>
      </Menu>
    </>
  );
};
export default ContextMenu;
