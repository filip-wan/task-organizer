import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice/index.js';

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Button component={Link} to={''} color='inherit'>
          Home
        </Button>
        <Button component={Link} to={'login'} color='inherit'>
          Login
        </Button>
        <Button component={Link} to={'settings'} color='inherit'>
          Settings
        </Button>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          type={'logout'}
          label={'Logout'}
          height={50}
          style={{
            right: 0,
            position: 'absolute',
          }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
