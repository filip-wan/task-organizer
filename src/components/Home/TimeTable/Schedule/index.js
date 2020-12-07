import 'react-calendar/dist/Calendar.css';

import { Card, CircularProgress, Grid, IconButton } from '@material-ui/core';
import { RRule, rrulestr } from 'rrule';
import React, { useEffect, useState } from 'react';
import { days, getColumns } from './utils';

import SaveIcon from '@material-ui/icons/Save';
import api from '../../../../api';
import { makeStyles } from '@material-ui/core/styles';
import { putItem } from '../../../../store/slices/itemsSlice';
import { useDispatch } from 'react-redux';

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
  const [selectedEvents, setSelectedEvents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    item.google &&
      !item.events?.length &&
      api('GET', 'calendar/events/?calendarId=' + item.google, (data) =>
        data
          .filter((c) => c.recurrence)
          .map((c) => ({ ...c, rule: rrulestr(c.recurrence.join('\n')) }))
          .filter((c) => frequencies.includes(c.rule.options.freq))
          .map((c) => ({
            dateCreated: c.created,
            dateStart: c.start.dateTime,
            dateEnd: c.end.dateTime,
            googleId: c.id,
            description: c.description,
            summary: c.summary,
            recurrence: c.recurrence,
          }))
      ).then((data) => setRules(data));
  }, [item.google, item.events?.length]);

  return (
    <Card className={classes.schedule}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Grid container justify='space-evenly' spacing={2}>
            {item.events?.length ? (
              getColumns(days, { rules: item.events })
            ) : rules ? (
              getColumns(days, { rules }, [selectedEvents, setSelectedEvents])
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
      </Grid>
      {item.google && !item.events?.length && (
        <IconButton
          className={classes.saveButton}
          disabled={selectedEvents.length <= 0}
          onClick={() => {
            selectedEvents.length > 0 &&
              dispatch(
                putItem({
                  id: item.id,
                  type: item.type,
                  events: rules.filter((r) =>
                    selectedEvents.find((e) => e.id === r.googleId)
                  ),
                })
              );
          }}
          aria-label='save timetable'>
          <SaveIcon />
        </IconButton>
      )}
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
  saveButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default Schedule;
