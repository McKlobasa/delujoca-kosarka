import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import useSpreadsheet from '../hooks/useSpreadsheet.js'


const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 0.3;
`

const Input1 = styled.input`
  border-style: none;
  text-align : left;
  color: #FFFFFF;
  padding: 5px;
  font-size: 3vh;
  font-weight: bold;
  width: 70%;
  flex: 3;
  flex-shrink: 1;
  background-color: var(--mainColor1);
  outline: none;
  &:focus {
    background-color: var(--backgroundDarkColor);
    color: var(--textColor);
    border-color: var(--backgroundDarkColor);
  }
`
const Input2 = styled.input`
  border-style: none;
  text-align : left;
  color: #FFFFFF;
  width: 30%;
  padding: 5px;
  font-size: 3vh;
  font-weight: bold;
  flex: 1;
  flex-shrink: 3;
  background-color: var(--mainColor1);
  outline: none;
  &:focus {
    background-color: var(--backgroundDarkColor);
    color: var(--textColor);
    border-color: var(--backgroundDarkColor);
  }
`
function TeamTitle(props) {
  const [nameTemp, setNameTemp] = useState(props.teamTitle)
  const teamData = useSpreadsheet(props.autocompletePath, props.autocompleteSheet)
  return (
    <Container>{/*
      <Input1 
        value={nameTemp} 
        onChange={(event) => {
          setNameTemp(event.target.value)
        }}
        onBlur={(event) => {
          props.setTeamTitle(nameTemp)
          teamData.grid.map((row, iter) => {
            if ( row[0].value == event.target.value ) {
              props.setTeamTitle(row[0].value)
              props.setTeamShort(row[2].value)
              props.setLogo(row[3].value)
            }
          })
        }}
        type="text" />*/}

      <Input1 type={"text"} list={"teams"} 
        onChange={(event) => {
          props.setTeamTitle(nameTemp)
          teamData.grid.map((row, iter) => {
            if ( row[0].value == event.target.value ) {
              props.setTeamTitle(row[0].value)
              props.setTeamShort(row[2].value)
              props.setLogo(row[3].value)
            }
          })
        }}

      />
      <datalist id={"teams"}>{
        teamData.grid.map((row, iter) => {
          return(<option value={row[0].value} />)
        })
      }</datalist>
      <Input1 
        style={{flex: '1'}}
        value={props.teamShort} 
        onChange={(event) => {
        props.setTeamShort(event.target.value);
      }} 
      type="text" />
      <Input1 
        style={{flex: '1'}}
        value={props.logo} 
        onChange={(event) => {
        props.setLogo(event.target.value);
      }} 
      type="text" />
    </Container>
  );
}

export default TeamTitle;
