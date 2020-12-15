import 'react-calendar/dist/Calendar.css';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import {
  deleteNotification,
  postNotification,
  putItem,
} from '../../store/slices/itemsSlice';

import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';

export const useNotificationDialog = () => {
  const [open, setOpen] = useState(false);
  const openDialog = (newOpen = !open) => {
    setOpen(newOpen);
  };

  const newNotificationDialog = (props) => (
    <NewNotificationDialog {...{ ...props, open, setOpen }} />
  );
  return [openDialog, newNotificationDialog];
};

const NewNotificationDialog = ({ open, setOpen, item }) => {
  const dispatch = useDispatch();
  const [descriptionField, setDescriptionField] = useState(
    item?.notification?.description ?? ''
  );
  const [dateField, setDateField] = useState(
    item?.deadline ? new Date(item.deadline) : new Date()
  );
  const [notificationOffset, setNotificationOffset] = useState(false);

  return (
    <Dialog
      open={open}
      PaperProps={{ style: { width: '50%' } }}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Deadline</DialogTitle>
      <DialogContent>
        <TextField
          color='secondary'
          autoFocus
          margin='dense'
          label='Description'
          disabled={!!item?.deadline}
          fullWidth
          value={descriptionField}
          style={{ marginBottom: 20 }}
          onChange={(e) => {
            setDescriptionField(e.target.value);
          }}
        />
        <div style={{ display: 'flex' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              variant='inline'
              color='secondary'
              label='Deadline date'
              ampm={false}
              disabled={!!item?.deadline}
              disablePast
              value={dateField}
              onChange={(date) => setDateField(date)}
            />
          </MuiPickersUtilsProvider>
          {!item.deadline ? (
            <div style={{ marginLeft: 20 }}>
              <InputLabel htmlFor='notification-offset-select'>
                Notify me
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='notification-offset-select'
                color='secondary'
                disabled={!!item?.deadline}
                value={notificationOffset}
                onChange={(e) => setNotificationOffset(e.target.value)}>
                <MenuItem value={false}>Off</MenuItem>
                <MenuItem value={0}>On start</MenuItem>
                <MenuItem value={15 * 60000}>15 minutes before</MenuItem>
                <MenuItem value={60 * 60000}>1 hour before</MenuItem>
                <MenuItem value={2 * 60 * 60000}>2 hours before</MenuItem>
                <MenuItem value={6 * 60 * 60000}>6 hours before</MenuItem>
                <MenuItem value={12 * 60 * 60000}>12 hours before</MenuItem>
                <MenuItem value={24 * 60 * 60000}>1 day before</MenuItem>
              </Select>
            </div>
          ) : (
            item.notification &&
            new Date(item.notification.date).getTime() >
              new Date().getTime() && (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  style={{ marginLeft: 20 }}
                  variant='inline'
                  color='secondary'
                  label='Notification date'
                  ampm={false}
                  disabled={true}
                  disablePast
                  value={new Date(item.notification?.date)}
                  // onChange={(date) => setDateField(date)}
                />
              </MuiPickersUtilsProvider>
            )
          )}
        </div>
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
            if (item.deadline) {
              if (item.notification)
                dispatch(
                  deleteNotification({
                    id: item.notification.id,
                    type: 'item',
                  })
                );
              dispatch(
                putItem({
                  id: item.id,
                  type: item.type,
                  deadline: '',
                })
              );
            } else {
              const date = new Date(dateField.getTime() - notificationOffset);
              dispatch(
                postNotification({
                  item: item.id,
                  type: 'item',
                  recurring: false,
                  date,
                  label: `Deadline: ${item.title}`,
                  description: descriptionField,
                })
              );
              dispatch(
                putItem({
                  id: item.id,
                  type: item.type,
                  deadline: dateField,
                })
              );
            }
          }}>
          {item?.deadline ? 'Delete deadline' : 'Create deadline'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNotificationDialog;
