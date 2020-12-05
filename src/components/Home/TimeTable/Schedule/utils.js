import React from 'react';
import ScheduleColumn from './ScheduleColumn';
import { rrulestr } from 'rrule';

export const days = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
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
