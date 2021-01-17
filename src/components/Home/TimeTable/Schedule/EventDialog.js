import 'react-calendar/dist/Calendar.css';

import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  deleteNotification,
  itemsSlice,
  postNotification,
  putItem,
} from '../../../../store/slices/itemsSlice';

import ContextTaskPicker from './ContextTaskPicker';
import { days } from './utils';
import { selectSlice } from '../../../../store';
import { useContextMenu } from 'react-contexify';
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

const EventDialog = ({ open, setOpen, event, day, hour, timetable }) => {
  const dispatch = useDispatch();
  const items = selectSlice(itemsSlice)();
  const [notificationOffset, setNotificationOffset] = useState(0);
  const [connections, setConnections] = useState([]);
  const { show } = useContextMenu({
    id: 'context-task-picker',
  });

  useEffect(() => {
    setConnections(
      event.connections?.map((connection) => {
        return (
          items.find((i) => i.id === connection) ||
          items
            .filter((i) => i.type === 'todo')
            ?.find((i) => i.items?.find((t) => t._id === connection))
            ?.items?.find((t) => t._id === connection)
        );
      })
    );
  }, [event, items]);

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
            cursor: 'default',
          }}>{`${days[day]} ${hour}`}</h5>
        <ContextTaskPicker
          todos={items.filter((i) => i.type === 'todo') || []}
          id='context-task-picker'
          event={event}
          timetable={timetable}
        />
        <DialogTitle style={{ cursor: 'default' }} id='form-dialog-title'>
          {event.summary}
        </DialogTitle>
        <DialogContentText
          style={{
            padding: '0 24px',
            cursor: 'default',
          }}>
          {event.description?.split('\n').map((i, key) => (
            <span key={key}>
              {i} <br />
            </span>
          ))}
        </DialogContentText>

        {connections
          ?.filter((c) => c !== undefined)
          .map((connection) => (
            <Card
              key={connection._id}
              style={{
                padding: 10,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Checkbox
                  checked={connection.state}
                  onClick={() => {
                    const todo = items
                      .filter((i) => i.type === 'todo')
                      ?.find((i) =>
                        i.items?.find((t) => t._id === connection._id)
                      );
                    dispatch(
                      putItem({
                        id: todo.id,
                        type: todo.type,
                        items: todo.items.map((v) =>
                          v._id === connection._id
                            ? { ...v, state: !connection.state }
                            : v
                        ),
                      })
                    );
                  }}
                  color='default'
                />
                <DialogContentText style={{ cursor: 'default' }}>
                  {connection.title || connection.text}
                </DialogContentText>
              </div>
              <Button
                onClick={() => {
                  dispatch(
                    putItem({
                      id: timetable.id,
                      type: timetable.type,
                      events: timetable.events.map((e) =>
                        e._id === event._id
                          ? {
                              ...event,
                              connections: event.connections.filter(
                                (c) => c !== connection._id
                              ),
                            }
                          : e
                      ),
                    })
                  );
                }}>
                Disconnect task
              </Button>
            </Card>
          ))}
        <Card
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <div>
            <DialogContentText style={{ cursor: 'default' }}>
              {event?.notification?.label}
            </DialogContentText>
          </div>
          <Button
            onClick={(e) => {
              show(e);
            }}>
            Connect task
          </Button>
        </Card>

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
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
