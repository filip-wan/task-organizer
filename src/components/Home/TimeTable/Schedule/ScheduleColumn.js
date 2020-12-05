import 'react-calendar/dist/Calendar.css';

import { Card, Divider, List, ListItem } from '@material-ui/core';
import React, { useState } from 'react';

import { getHour } from './utils';
import { makeStyles } from '@material-ui/core/styles';

const ScheduleColumn = ({ day, events }) => {
  const classes = useStyles();
  const [pickedEvents, setPickedEvents] = useState([]);
  console.log(events, 'ENEVESFD', day);
  // console.log(test);
  return (
    <List>
      <ListItem>{day}</ListItem>
      <Divider />
      {events
        .sort(
          (a, b) =>
            new Date(b.event.start.dateTime).valueOf() -
            new Date(a.event.start.dateTime).valueOf()
        )
        .map((event) => {
          const start = new Date(event.event.start.dateTime);
          const end = new Date(event.event.end.dateTime);

          return (
            <ListItem
              key={event.event.id}
              className={classes.item}
              button
              onClick={() => {
                if (pickedEvents.includes(event.event.id))
                  setPickedEvents(
                    pickedEvents.filter((e) => e !== event.event.id)
                  );
                else setPickedEvents([...pickedEvents, event.event.id]);
              }}>
              <Card
                raised={pickedEvents.includes(event.event.id)}
                className={classes.itemCard}>
                {`${getHour(start)} - ${getHour(end)}`}
                <br />
                {event.event.summary}
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
