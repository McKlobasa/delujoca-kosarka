import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';
import MainContainer from './MainContainer.js'

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
render(
  <AppContainer>
    <MainContainer />
  </AppContainer>,
  document.getElementById('root')
);
