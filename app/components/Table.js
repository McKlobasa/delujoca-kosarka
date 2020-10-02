import React, {useState, useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import { LastRowContext, StartingPlayersContext } from '../context.js'


const StyledTopRow = styled.div`
  display: flex;
  flex:1;
  flex-direction: row;
  background-color: var(--secondaryColor1);
  font-weight: bold;
  font-size: 1vw;
`
const TopRowCell = styled.div`
  padding: 0px;
  color: var(--backgroundColor);
  flex: ${props => props.size};
  width: 100%;
  height: 100%;
  border: none;
`
const Container = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--backgroundDarkColor);
`
const Input = styled.input`
  padding: 0px;
  font-size: 13px;
  color: ;
  flex: ${props => props.size};
  outline: none;
  height: 100%;
  border: none;
  color: ${props => props.isLast ? 'var(--backgroundColor)' : 'var(--textColor)'};

  background: ${props => props.isLast ? 'grey' 
                         : (props.isOdd ?'var(--backgroundColor)' : 'var(--backgroundDarkerColor)' )}
  &: focus {
    background-color: var(--mainColor1);
    border-color: var(--mainColor1);
    color: white;
  }
`
const StickyButton = styled.button`
  flex: 1;
  width: 30px;
  height: 100%;
  padding:0;
  outline: none;
  border: none;
  background: var(--backgroundColor);
  border-bottom: 1px solid var(--backgroundDarkerColor);
  ${({selected}) => selected && css`
    background:var(--secondaryColor1);
  `}
`
const Line = styled.div`
  display: flex;
  flex:1;
  flex-direction: row;

`


function Button(props) {
  const [selectedPlayers, dispatch] = useContext(StartingPlayersContext)
  const selected = (!!selectedPlayers.find(p => p.name == props.name) && !!selectedPlayers.find(p => p.surname == props.surname))
  return (
    <StickyButton 
      selected={selected} 
      onClick={ () => {
        dispatch({type: 'toggle', player: {name : props.name, surname: props.surname}})
      }}
    />
  )
}

function Cell(props) {
  return(
    <Input 
      isLast={props.isLast}
      isOdd={props.isOdd}
      value={props.data} 
      size={props.size}
      onClick={() => props.action()}
      onChange={(evt) => {
        props.changeValue(props.row, props.column, evt.target.value)
      }}
    />
  )
}

function TopRow (props) {
  return(
    <StyledTopRow> 
      <TopRowCell
        size={1}>no.</TopRowCell>
      <TopRowCell
        size={3}>name</TopRowCell>
      <TopRowCell
        size={3}>surname</TopRowCell>
      <TopRowCell
        size={1}>pts</TopRowCell>
      <TopRowCell
        size={1}>fouls</TopRowCell>
      <TopRowCell
        size={1} style={{ width: '30px' }}>SP</TopRowCell>
    </StyledTopRow> 
  )
}

function Row(props) {
  return(
    <Line highlighted={props.isLast}>
      <Cell
        isLast={props.isLast}
        isOdd={props.isOdd}
        size={1}
        data={props.player[0].value}
        row={props.row}
        column={0}
        action={()=>{
          props.setLastRow({row: props.row, team: props.team})
        }}
        changeValue={props.changeValue}
      />
      <Cell 
        isLast={props.isLast}
        isOdd={props.isOdd}
        size={3}
        data={props.player[1].value}
        row={props.row}
        column={1}
        action={()=>{
          props.setLastRow({row: props.row, team: props.team})
        }}
        changeValue={props.changeValue}
      />
      <Cell 
        isLast={props.isLast}
        isOdd={props.isOdd}
        size={3}
        data={props.player[2].value}
        row={props.row}
        column={2}
        action={()=>{
          props.setLastRow({row: props.row, team: props.team})
        }}
        changeValue={props.changeValue}
      />
      <Cell 
        isLast={props.isLast}
        isOdd={props.isOdd}
        size={1}
        data={props.player[3].value}
        row={props.row}
        column={3}
        action={()=>{
          props.setLastRow({row: props.row, team: props.team})
        }}
        changeValue={props.changeValue}
      />
      <Cell 
        isLast={props.isLast}
        isOdd={props.isOdd}
        size={1}
        data={props.player[4].value}
        row={props.row}
        column={4}
        action={()=>{
          props.setLastRow({row: props.row, team: props.team})
        }}
        changeValue={props.changeValue}
      />
      <Button 
        name={`${props.data.grid[props.row][1].value}`}
        surname={`${props.data.grid[props.row][2].value}`}
        key={`switch-${props.row}`} 
        rowNumber={props.row}
      />
    </Line>
  )
}

function Table(props) {
  const [lastRow, lastTeam] = useContext(LastRowContext)
  const checkIfLast = (row) => {
    if (lastRow.team == props.team && lastRow.row == row && row > 0) {
      return true
    } else {
      return false
    }
  }
  return(
    <Container>
      <TopRow />
      {props.data.grid.map((player, row) => {
        if (row) {
          return <Row 
            isOdd={row % 2}
            position={row}
            key={row}
            isLast={checkIfLast(row)}
            player={player} 
            row={row} 
            setLastRow={props.setRow} 
            team={props.team} 
            changeValue={props.data.changeValue}
            data={props.data}
          />

        }
      }
      )}
    </Container>
  )
}


export default Table

