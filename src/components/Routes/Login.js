import { Button, Card } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/slices/userSlice/index.js';

const Login = () => {
  const dispatch = useDispatch();

  return (
    <Card>
      <Button
        href={process.env.REACT_APP_API_URL + 'auth/github'}
        type={'github'}
        label={'Login with Github'}
        height={50}>
        Github
      </Button>
      <Button
        href={process.env.REACT_APP_API_URL + 'auth/facebook'}
        type={'facebook'}
        label={'Login with Facebook'}
        height={50}>
        Facebook
      </Button>
      <Button
        href={process.env.REACT_APP_API_URL + 'auth/google'}
        type={'google'}
        label={'Login with Google'}
        height={50}>
        Google
      </Button>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
        type={'logout'}
        label={'Logout'}
        height={50}>
        Logout
      </Button>
    </Card>
  );
};

export default Login;
