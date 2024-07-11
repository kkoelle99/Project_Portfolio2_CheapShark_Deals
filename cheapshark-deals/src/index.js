import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);