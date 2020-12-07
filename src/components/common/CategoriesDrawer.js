import {
  Button,
  Card,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListSubheader,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  categoriesSlice,
  deleteCategory,
  toggleCategory,
} from '../../store/slices/categoriesSlice';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import { selectSlice } from '../../store';
import { useDispatch } from 'react-redux';
import { useNewCategoryDialog } from './NewCategoryDialog';

export const useDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (_e, newOpen = !open) => {
    setOpen(newOpen);
  };
  const drawer = (props) => (
    <CategoriesDrawer open={open} toggleDrawer={toggleDrawer} {...props} />
  );
  return [toggleDrawer, drawer];
};

export const CategoriesDrawer = ({ toggleDrawer, open, children }) => {
  const dispatch = useDispatch();
  const categories = selectSlice(categoriesSlice)();
  const [openDialog, NewCategoryDialog] = useNewCategoryDialog();

  return (
    <Drawer anchor={'left'} open={open} onClose={(e) => toggleDrawer(e, false)}>
      <NewCategoryDialog />
      <Card raised={false} style={{ minWidth: 300 }}>
        <List
          subheader={
            <ListSubheader
              style={{ userSelect: 'none', fontSize: 30 }}
              component='h1'>
              Filter Categories
            </ListSubheader>
          }>
          <Divider />
          {categories.map((c) => (
            <ListItem key={c.id}>
              <LabelIcon style={{ color: c.color, marginRight: 10 }} />
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: 'white' }}
                    checked={c.toggled ?? false}
                    onChange={() => dispatch(toggleCategory(c.id))}
                    name={c.id}
                  />
                }
                label={c.label}
              />
              <DeleteIcon
                onClick={() => {
                  dispatch(deleteCategory({ id: c.id }));
                }}
                style={{
                  color: '#f44336',
                  position: 'absolute',
                  right: 10,
                  cursor: 'pointer',
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Button style={{ width: '100%' }} onClick={() => openDialog(true)}>
          <AddCircleIcon style={{ color: 'white', marginRight: 10 }} />
          New category
        </Button>
      </Card>
      {children}
    </Drawer>
  );
};

export default CategoriesDrawer;
