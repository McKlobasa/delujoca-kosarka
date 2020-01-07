import React, {useState, useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import { LastRowContext, StartingPlayersContext } from '../context.js'


const Container = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid var(--backgroundDarkColor);
`
const StyledCell = styled.div`
  padding: 0px;
  font-size: 12px;
  color: var(--textColor) ;
  flex: 1;
  outline: none;
  height: 100%;
  border: 1px solid var(--backgroundDarkColor);
  color: var(--textColor);
  background-color: var(--backgroundColor);
`
const Line = styled.div`
  display: flex;
  flex:1;
  flex-direction: row;
`

function Cell(props) {
  return(
    <StyledCell>{props.data}</StyledCell>
  )
}

function Row(props) {
  return(
    <Line>
      {props.data.map((cellData, iter) => {

      return(<StyledCell>{cellData.value}</StyledCell>)
      })}
    </Line>
  )
}

function Table(props) {
  return(
    <Container>
      {props.data.grid.map((player, row) => {
        if (row) {
          return <Row 
            position={row}
            key={row}
            row={row} 
            data={player}
          />
        }}
      )}

    </Container>

  )
}


export default Table

