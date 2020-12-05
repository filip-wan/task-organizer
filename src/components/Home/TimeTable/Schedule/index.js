import 'react-calendar/dist/Calendar.css';

import { Card, CircularProgress, Grid } from '@material-ui/core';
import { RRule, rrulestr } from 'rrule';
import React, { useEffect, useState } from 'react';
import { days, getColumns, getDate } from './utils';

import CalendarPicker from './CalendarPicker';
import api from '../../../../api';
import { makeStyles } from '@material-ui/core/styles';

const frequencies = [
  RRule.SECONDLY,
  RRule.MINUTELY,
  RRule.HOURLY,
  RRule.DAILY,
  RRule.WEEKLY,
];

const Schedule = ({ item }) => {
  const classes = useStyles();
  const [rules, setRules] = useState();

  useEffect(() => {
    item.google &&
      !item.events &&
      api(
        'GET',
        'calendar/events/?calendarId=' + item.google
        // (data) => setCalendar(data)
      ).then((data) =>
        setRules(
          data
            .filter((c) => c.recurrence)
            .map((c) => ({ ...c, rule: rrulestr(c.recurrence.join('\n')) }))
            .filter((c) => frequencies.includes(c.rule.options.freq))
        )
      );
  }, [item.google]);

  // console.log(calendar);

  // const rules = calendar
  //   .filter((c) => c.recurrence)
  //   .map((c) => ({ ...c, rule: rrulestr(c.recurrence.join('\n')) }))
  //   .filter((c) => frequencies.includes(c.rule.options.freq));

  // console.log(
  //   '%c RULE \n',
  //   'background: gold; color: green',
  //   rules,
  //   rules.map((r) => r.rule?.options?.freq)
  // );

  return (
    <Card className={classes.schedule}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Grid container justify='space-evenly' spacing={2}>
            {item.google ? (
              rules ? (
                item.events ? (
                  getColumns(days, { events: item.events })
                ) : (
                  getColumns(days, { rules })
                )
              ) : (
                <CircularProgress />
              )
            ) : (
              <CalendarPicker item={item} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

const useStyles = makeStyles({
  schedule: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  grid: {
    overflow: 'auto',
  },
});

export default Schedule;
