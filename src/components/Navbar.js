import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';

const Navbar = () => {
  return (
    <AppBar position='static' color='secondary'>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
