import React from 'react';
import ScheduleColumn from './ScheduleColumn';
import { rrulestr } from 'rrule';

export const days = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};

export const getDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + ((7 - date.getDay()) % 7) + 1 + days);
  const secondDate = new Date(date);
  secondDate.setDate(date.getDate() + 1);
  return [date, secondDate];
};

export const getColumns = (daysToMap, { rules = [] }, selectedEvents) =>
  Object.keys(daysToMap).map((day) => (
    <ScheduleColumn
      key={day}
      day={day}
      selectedEvents={selectedEvents}
      events={[
        ...rules.reduce(
          (arr, r) => [
            ...arr,
            ...rrulestr(r.recurrence.join('\n'))
              .between(...getDate(day))
              .map((date) => ({ ...r, date })),
          ],
          []
        ),
      ]}
    />
  ));

export const getHour = (date) =>
  `${date.getHours().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${date
    .getMinutes()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
