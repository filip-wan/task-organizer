import { Input } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectSlice } from '../../store';
import { userSlice, changeName } from '../../store/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const user = selectSlice(userSlice)();
  return (
    <div>
      Login {user.name}
      <br />
      <Input
        onChange={(e) => dispatch(changeName(e.target.value))}
        type='text'
      />
    </div>
  );
};

export default Login;
