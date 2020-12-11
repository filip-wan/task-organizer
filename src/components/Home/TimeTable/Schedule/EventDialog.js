import 'react-calendar/dist/Calendar.css';

import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  deleteNotification,
  postNotification,
} from '../../../../store/slices/itemsSlice';

import { days } from './utils';
import { useDispatch } from 'react-redux';

export const useEventDialog = () => {
  const [open, setOpen] = useState(false);
  const openDialog = (newOpen = !open) => {
    setOpen(newOpen);
  };

  const newEventDialog = (props) => (
    <EventDialog {...{ ...props, open, setOpen }} />
  );
  return [openDialog, newEventDialog];
};

const EventDialog = ({ open, setOpen, event, day, hour }) => {
  const dispatch = useDispatch();
  const [notificationOffset, setNotificationOffset] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      style={{ padding: 5 }}
      PaperProps={{ style: { width: '50%' } }}
      aria-labelledby='form-dialog-title'>
      <DialogContent>
        <h5
          style={{
            padding: '0 24px',
            margin: 0,
          }}>{`${days[day]} ${hour}`}</h5>
        <DialogTitle id='form-dialog-title'>{event.summary}</DialogTitle>
        <DialogContentText
          style={{
            padding: '0 24px',
          }}>
          {event.description?.split('\n').map((i, key) => (
            <span key={key}>
              {i} <br />
            </span>
          ))}
        </DialogContentText>
        {!event.notification ? (
          <Card
            style={{
              padding: 10,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <div>
              <InputLabel htmlFor='notification-offset-select'>
                Notify me
              </InputLabel>
              <Select
                id='notification-offset-select'
                value={notificationOffset}
                onChange={(e) => setNotificationOffset(e.target.value)}>
                <MenuItem value={0}>On start</MenuItem>
                <MenuItem value={15 * 60000}>15 minutes before</MenuItem>
                <MenuItem value={60 * 60000}>1 hour before</MenuItem>
                <MenuItem value={2 * 60 * 60000}>2 hours before</MenuItem>
                <MenuItem value={6 * 60 * 60000}>6 hours before</MenuItem>
                <MenuItem value={12 * 60 * 60000}>12 hours before</MenuItem>
                <MenuItem value={24 * 60 * 60000}>1 day before</MenuItem>
              </Select>
            </div>
            <Button
              onClick={() => {
                const date = new Date(
                  new Date(event.dateStart).getTime() - notificationOffset
                );
                dispatch(
                  postNotification({
                    item: event._id,
                    type: 'event',
                    recurring: true,
                    date,
                    label: event.summary,
                    description: event.description,
                    day:
                      day -
                      (new Date(event.dateStart).getDay() +
                        1 -
                        (date.getDay() + 1)),
                  })
                );
              }}>
              Create notification
            </Button>
          </Card>
        ) : (
          <Card
            style={{
              padding: 10,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <div>
              <DialogContentText>
                {`${days[event?.notification?.day]} ${new Date(
                  event?.notification?.date
                ).getHours()} : ${new Date(
                  event?.notification?.date
                ).getMinutes()}`}
              </DialogContentText>
              <DialogContentText>
                {event?.notification?.label}
              </DialogContentText>
            </div>
            <Button
              onClick={() => {
                dispatch(
                  deleteNotification({
                    id: event.notification.id,
                    type: 'event',
                  })
                );
              }}>
              Delete notification
            </Button>
          </Card>
        )}
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
            // if (!labelField || !colorField) return false;

            // dispatch(postCategory({ label: labelField, color: colorField }));
            setOpen(false);
          }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
