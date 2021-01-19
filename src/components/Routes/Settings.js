import { Button, Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { deleteUser, editUser, userSlice } from '../../store/slices/userSlice';

import { selectSlice } from '../../store';
import { useDispatch } from 'react-redux';

const Settings = () => {
  const dispatch = useDispatch();
  const user = selectSlice(userSlice)();
  const [email, setEmail] = useState(user.email || '');

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        margin: '10% auto',
        width: 'fit-content',
      }}>
      <TextField
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        color='secondary'
        style={{ width: '100%' }}
      />
      <Button
        onClick={() => {
          dispatch(editUser({ email }));
        }}
        label={'Change Email'}
        height={50}>
        Change Email
      </Button>
      <Button
        onClick={() => {
          dispatch(deleteUser());
        }}
        label={'Delete Account'}
        height={50}>
        Delete Account
      </Button>
    </Card>
  );
};

export default Settings;
