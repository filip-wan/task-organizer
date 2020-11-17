import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#53206E' },
    secondary: { main: '#3e53c2' },
  },
  overrides: {
    /** Custom scrollbar */
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.7em',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: 20,
        },
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
