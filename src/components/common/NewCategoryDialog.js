import 'react-calendar/dist/Calendar.css';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

import { postCategory } from '../../store/slices/categoriesSlice';
import { useDispatch } from 'react-redux';

export const useNewCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const openDialog = (newOpen = !open) => {
    setOpen(newOpen);
  };

  const newCategoryDialog = (props) => (
    <NewCategoryDialog {...{ ...props, open, setOpen }} />
  );
  return [openDialog, newCategoryDialog];
};

const NewCategoryDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [labelField, setLabelField] = useState('');
  const [colorField, setColorField] = useState('');

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Create new label</DialogTitle>
      <DialogContent>
        <TextField
          color='secondary'
          autoFocus
          margin='dense'
          id='name'
          label='Label'
          fullWidth
          value={labelField}
          onChange={(e) => {
            setLabelField(e.target.value);
          }}
        />
        <TextField
          color='secondary'
          margin='dense'
          id='name'
          label='Color'
          fullWidth
          value={colorField}
          onChange={(e) => {
            setColorField(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (!labelField || !colorField) return false;

            dispatch(postCategory({ label: labelField, color: colorField }));
            setOpen(false);
          }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCategoryDialog;
