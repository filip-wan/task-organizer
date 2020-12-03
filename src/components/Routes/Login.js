import { Button, Card } from '@material-ui/core';
import React from 'react';

const Login = () => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        margin: '10% auto',
        width: 'fit-content',
      }}>
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
    </Card>
  );
};

export default Login;
