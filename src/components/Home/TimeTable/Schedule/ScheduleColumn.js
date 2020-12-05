import 'react-calendar/dist/Calendar.css';

import { Card, Divider, List, ListItem } from '@material-ui/core';
import { days, getHour } from './utils';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ScheduleColumn = ({ day, events, selectedEvents = [] }) => {
  const classes = useStyles();
  const [pickedEvents, setPickedEvents] = selectedEvents;
  return (
    <List>
      <ListItem>{days[day]}</ListItem>
      <Divider />
      {events
        .sort(
          (a, b) =>
            new Date(b.dateStart).valueOf() - new Date(a.dateEnd).valueOf()
        )
        .map((event) => {
          const start = new Date(event.dateStart);
          const end = new Date(event.dateEnd);

          return (
            <ListItem
              key={event.googleId}
              className={classes.item}
              button
              onClick={() => {
                if (!pickedEvents) return;
                if (pickedEvents.find((e) => e.id === event.googleId))
                  setPickedEvents(
                    pickedEvents.filter((e) => e.id !== event.googleId)
                  );
                else
                  setPickedEvents([
                    ...pickedEvents,
                    { id: event.googleId, day },
                  ]);
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
          );
        })}
    </List>
  );
};

const useStyles = makeStyles({
  schedule: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
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

export default ScheduleColumn;
