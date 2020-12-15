import 'react-calendar/dist/Calendar.css';

import { Card, Divider, ListItem } from '@material-ui/core';

import React from 'react';
import { getHour } from './utils';
import { makeStyles } from '@material-ui/core/styles';
import { useEventDialog } from './EventDialog';

const ScheduleEvent = ({ day, event, selectedEvents = [], timetable }) => {
  const classes = useStyles();
  const [openDialog, EventDialog] = useEventDialog();
  const start = new Date(event.dateStart);
  const end = new Date(event.dateEnd);
  const [pickedEvents, setPickedEvents] = selectedEvents;

  return (
    <>
      <EventDialog
        day={day}
        event={event}
        hour={`${getHour(start)} - ${getHour(end)}`}
        timetable={timetable}
      />
      <ListItem
        key={event.googleId}
        className={classes.item}
        button
        onClick={() => {
          if (!pickedEvents) {
            openDialog();
          } else {
            if (pickedEvents.find((e) => e.id === event.googleId))
              setPickedEvents(
                pickedEvents.filter((e) => e.id !== event.googleId)
              );
            else
              setPickedEvents([...pickedEvents, { id: event.googleId, day }]);
          }
        }}>
        <Card
          raised={!!pickedEvents?.find((e) => e.id === event.googleId)}
          className={classes.itemCard}>
          {`${getHour(start)} - ${getHour(end)}`}
          <br />
          {event.summary}
        </Card>
        <Divider />
      </ListItem>
    </>
  );
};

const useStyles = makeStyles({
  item: {
    margin: '10px 0px',
    width: '100%',
    padding: 0,
  },
  itemCard: {
    height: '100%',
    width: '100%',
    padding: 8,
  },
});

export default ScheduleEvent;
