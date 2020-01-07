import React, {useState, useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import { LastRowContext, StartingPlayersContext } from '../context.js'

const Container = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  width: 100px;
  height: 100px;
  border-bottom: 1px solid var(--backgroundDarkColor);
`
const Cell = styled.div`
  padding: 0px;
  font-size: 18px;
  flex: 1;
  outline: none;
  height: 10px;
  width: 10px;
  border: none;
  
`
const Row = styled.div`
  display: flex;
  flex:1;
  flex-direction: row;

`

function Line(props) {
  console.log(props.data)
  return (
    <Row>
      {props.data.grid.map((cell, iter) => {
        <Cell>{cell.value}</Cell>
      })}
    </Row>
  )
}
function Table(props) {
  console.log(props.data)
  return(
    <Container>
      {props.data.grid.map((row, iter) => {<Line data={row}/>})}
    </Container>
  )
}


export default Table

