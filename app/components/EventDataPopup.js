import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Popup from "reactjs-popup";
import EventData from './EventData.js';

const Container = styled.div`
  flex:0.5;
`
const TriggerButton = styled.div`
  font-size: 2vw;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  margin: 0;
  color: var(--backgroundColor);
  background-color: var(--mainColor1);
`

function EventDataPopup(props) {
  return(
    <Container>
      <Popup 
        trigger={<TriggerButton>EVENT DATA</TriggerButton>} 
        modal
        closeOnDocumentClick
      ><EventData/></Popup>
    </Container>
  );
}

export default EventDataPopup;

