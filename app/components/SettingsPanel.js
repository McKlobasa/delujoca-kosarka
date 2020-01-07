import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Popup from "reactjs-popup";

import FastTextInput from './minicomponents/FastTextInput.js'
import FileSelector from './minicomponents/FileSelector.js'

const Container = styled.div`
`
const TriggerButton = styled.button`
  flex: 1;
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 3vh;
  border: 0;
  padding: 0px;
  margin: 0;
  color: var(--backgroundColor);
  background-color: var(--mainColor1);
  outline: none;
  &: hover {
      background-color: var(--secondaryColor1);  
  }
  &: active {
      background-color: var(--mainColor2);  
  }
  ${({opened}) => opened && css` 
      box-shadow: 0px 0px 10px rgba(0,0,0,0.25);
  `
  }
`
const StyledContainer = styled.div` 
  background-color: var(--backgroundColor);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`
const StyledInput = styled.input`
  background-color: var(--backgroundColor);
  border: 1px solid var(--backgroundDarkColor);
  border-radius: 4px;
  height: 25px;
  margin: 5px;
  padding: 3px;
  color: var(--textColor);
`
const Title = styled.h1`
  font-size: 15px;
  color: var(--textColor)
`

function SettingsElements(props) {
  return(
    <StyledContainer>
      <Title>connection: ip port</Title>
      <div>
        <StyledInput
          onChange={props.setIP}
          value={props.connection.ip}
        />
        <StyledInput
          onChange={props.setPort}
          value={props.connection.port}
        />
      </div>
        <Title>lineup XLSX path</Title>
      <FileSelector
        key={1}
        setPath={props.setExcelLineup}
        path={props.excelLineup}
        id={'lineup'}
      />
      <Title>fixtures XLSX path</Title>
      <FileSelector
        key={2}
        setPath={props.setFixturesPath}
        path={props.fixturesPath}
        id={'fixtures'}
      />
      <FastTextInput 
        key={3}
        text={props.fixturesSheet}
        setText={props.setFixturesSheet}
      />
      <Title>standings XLSX path</Title>
      <FileSelector
        key={4}
        setPath={props.setStandingsPath}
        path={props.standingsPath}
        id={'standings'}
      />
      <FastTextInput 
        key={5}
        text={props.standingsSheet}
        setText={props.setStandingsSheet}
      />
      <Title>autocomplete XLSX path</Title>
      <FileSelector
        key={6}
        setPath={props.setAutocompletePath}
        path={props.autocompletePath}
        id={'autocomplete'}
      />
      <FastTextInput 
        key={5}
        text={props.autocompleteSheet}
        setText={props.setAutocompleteSheet}
      />
      <FastTextInput 
      />
    </StyledContainer>
  )
}

function SettingsPanel(props) {
  return(
    <Container>
      <Popup 
        trigger={<TriggerButton>Settings</TriggerButton>} 
        modal
        closeOnDocumentClick
      >
      <SettingsElements
        autocompletePath={props.autocompletePath}
        autocompleteSheet={props.autocompleteSheet}
        setAutocompletePath={props.setAutocompletePath}
        setAutocompleteSheet={props.setAutocompleteSheet}
        fixturesPath={props.fixturesPath}
        standingsSheet={props.standingsSheet}
        fixturesSheet={props.fixturesSheet}
        standingsPath={props.standingsPath}
        setStandingsSheet={props.setStandingsSheet}
        setStandingsPath={props.setStandingsPath}
        setFixturesSheet={props.setFixturesSheet}
        setFixturesPath={props.setFixturesPath}
        excelLineup={props.excelLineup}
        setExcelLineup={props.setExcelLineup}
        connection={props.connection}
        setIP={props.setIP}
        setPort={props.setPort}
      />
      </Popup>
    </Container>
  );
}




export default SettingsPanel;

