import React from 'react';
import ScheduleColumn from './ScheduleColumn';

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

export const getColumns = (daysToMap, { rules = [], events = [] }) =>
  Object.keys(daysToMap).map((day) => (
    <ScheduleColumn
      key={day}
      day={days[day]}
      test={getDate(day)}
      events={[
        ...rules.reduce(
          (arr, r) => [
            ...arr,
            ...r.rule
              .between(...getDate(day))
              .map((e) => ({ date: e, event: r })),
          ],
          events
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
