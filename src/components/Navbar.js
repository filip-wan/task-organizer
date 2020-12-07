import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';

import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { logout } from '../store/slices/userSlice';
import { selectSlice } from '../store';
import { useDispatch } from 'react-redux';
import { useDrawer } from './common/CategoriesDrawer';
import { userSlice } from '../store/slices/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = selectSlice(userSlice)();
  const [toggleDrawer, Drawer] = useDrawer();

  return (
    <AppBar position='static' color='primary'>
      <Drawer />
      <Toolbar>
        <IconButton
          onClick={(e) => toggleDrawer(e, true)}
          edge='start'
          color='inherit'
          aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Button component={Link} to={''} color='inherit'>
          Home
        </Button>
        {user.authorized && (
          <Button component={Link} to={'settings'} color='inherit'>
            Settings
          </Button>
        )}
        {user.authorized ? (
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
        ) : (
          <Button
            component={Link}
            to={'login'}
            style={{
              right: 0,
              position: 'absolute',
            }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
