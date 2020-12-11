import 'react-calendar/dist/Calendar.css';

import { Divider, List, ListItem } from '@material-ui/core';

import React from 'react';
import ScheduleEvent from './ScheduleEvent';
import { days } from './utils';

const ScheduleColumn = ({ day, events, selectedEvents = [] }) => {
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
          return (
            <ScheduleEvent
              key={event.googleId || event._id}
              day={day}
              event={event}
              selectedEvents={selectedEvents}
            />
          );
        })}
    </List>
  );
};

export default ScheduleColumn;
