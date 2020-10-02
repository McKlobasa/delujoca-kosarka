import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { LastRowContext } from '../context.js'
import { useSocket } from '../hooks/useSocket'

import * as net from 'net'   


const ImportantStyledButton = styled.button`
  flex: 1;   
  flex-basis: 16.5%;
  flex-shrink: 0;
  background-color: var(--mainColor1); 
  border: 0.5px solid var(--secondaryColor1);   
  font-size: 1.3em; 
  font-weight: bold; 
  color: var(--backgroundColor);  
  outline: none; 
  width: 15.5%;
  padding: 2px;
  &: hover {
      background-color: var(--secondaryColor1);  
      border: 1px solid var(--secondaryColor1); 
  }
  &: active {
      background-color: var(--mainColor2);  
      border: 1px solid var(--mainColor2); 
      transform: scale(1);
      transition: all 0.05s ease; 
      box-shadow: none; 
  }
`
const StyledButton = styled.button`
  flex: 1; 
  flex-shrink: 0;
  flex-basis: 16.5%;
  background-color: var(--backgroundColor); 
  border: 0.5px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  width: 15.5%;
  font-weight: bold;
  color: var(--mainColor1);
  outline: none;
  flex-grow: 1;
  padding: 5px;

  &: hover { 
    background-color: var(--backgroundDarkerColor);
  }
  &: active {
    background-color: var(--textColor);
    color: var(--backgroundColor);
    box-shadow: none;
  }
`
const FoulButton = styled.button`
  flex: 1; 
  flex-shrink: 0;
  flex-basis: 16.5%;
  background-color: #d15c5c; 
  border: 0.5px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  width: 15.5%;
  font-weight: bold;
  color: var(--backgroundColor);
  outline: none;
  flex-grow: 1;
  padding: 5px;

  &: hover { 
    background-color: var(--backgroundDarkerColor);
  }
  &: active {
    background-color: var(--textColor);
    color: var(--backgroundColor);
    box-shadow: none;
  }
`
const DefButton = styled.button`
  flex: 1; 
  flex-shrink: 0;
  flex-basis: 16.5%;
  background-color: var(--secondaryColor1); 
  border: 0.5px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  width: 15.5%;
  font-weight: bold;
  color: var(--backgroundColor);
  outline: none;
  flex-grow: 1;
  padding: 5px;

  &: hover { 
    background-color: var(--mainColor1);
  }
  &: active {
    background-color: var(--mainColor1);
    color: var(--backgroundColor);
    box-shadow: none;
  }
`
const OffButton = styled.button`
  flex: 1; 
  flex-shrink: 0;
  flex-basis: 16.5%;
  background-color: var(--mainColor1); 
  border: 0.5px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  width: 15.5%;
  font-weight: bold;
  color: var(--backgroundColor);
  outline: none;
  flex-grow: 1;
  padding: 5px;

  &: hover { 
    background-color: var(--secondaryColor1);
  }
  &: active {
    background-color: var(--textColor);
    color: var(--backgroundColor);
    box-shadow: none;
  }
`
const StyledButtonRow = styled.div`
  flex: 1;
  display: flex; 
  align-items: stretch;
  flex-direction: row;
  align-items: stretch;
`
const StyledButtonBoard = styled.div`
  flex: 2;
  min-width: 200px;
  display: flex; 
  align-items: stretch;
  flex-direction: column;
  align-items: stretch;
  margin: 5px;
`
const StyledScoreInput = styled.input`
  flex:1;
  width: 40%;
  border: none
  height: 90%;
  color: var(--textColor);
  outline: none;
  font-size: 6vh;
  font-weight: bold;
  text-align: center;
`
const StyledScoreText = styled.div`
  height: 90%;
  flex: 2;
  flex-direction: row;
  color: var(--textColor);
  font-size: 6vh;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
`
const StyledScoreBoard = styled.div`
  flex:1;
  display: flex; 
  min-width: 300px;
  min-height: 150px;
  position: relative;
  justify-content: center;
  flex-direction: column;
  background-color: var(--backgroundColor);
  overflow-y: none;
`


function ActionButton(props) {
  return(
    <StyledButton 
      onClick={props.action}
      onContextMenu={props.onRightClick}
    >{props.actionName}</StyledButton>
  )
}
function ImportantActionButton(props) {
  return(
    <ImportantStyledButton 
      onClick={props.action}
      onContextMenu={props.onRightClick}
    >{props.actionName}</ImportantStyledButton>
  )
}
function FoulActionButton(props) {
  return(
    <FoulButton 
      onClick={props.action}
      onContextMenu={props.onRightClick}
    >{props.actionName}</FoulButton>
  )
}
function DefActionButton(props) {
  return(
    <DefButton 
      onClick={props.action}
      onContextMenu={props.onRightClick}
    >{props.actionName}</DefButton>
  )
}
function OffActionButton(props) {
  return(
    <OffButton 
      onClick={props.action}
      onContextMenu={props.onRightClick}
    >{props.actionName}</OffButton>
  )
}

function TopButtonRow(props) {
  return(
    <StyledButtonRow>
      <ImportantActionButton 
        actionName={'+1'} 
        action={()=>props.increment(1)} 
        onRightClick={()=>props.decrement(1)}
      />
      <ImportantActionButton 
        actionName={'+2'}
        action={()=>props.increment(2)} 
        onRightClick={()=>props.decrement(2)}
      />
      <ImportantActionButton 
        actionName={'+3'} 
        action={()=>props.increment(3)} 
        onRightClick={()=>props.decrement(3)}
      />
      <ActionButton 
        actionName={"steal"} 
        action={()=>{props.incrementStat(18)}}
        onRightClick={()=>props.decrementStat(18)}
      />
      <ActionButton 
        actionName={"lost"}
        action={()=>{props.incrementStat(17)}}
        onRightClick={()=>props.decrementStat(17)}
      />
      <ActionButton 
        actionName={"asist"}
        action={()=>{props.incrementStat(19)}}
        onRightClick={()=>props.decrementStat(19)}
      />
    </StyledButtonRow>
  );
}

function BottomButtonRow(props) {
  return(
    <StyledButtonRow>
      <ActionButton actionName={"Missed 1"} 
        action={()=>{props.missedAction(0)}}
      />
      <ActionButton actionName={"Missed 2"} 
        action={()=>{props.missedAction(1)}}
      />
      <ActionButton actionName={"Missed 3"} 
        action={()=>{props.missedAction(2)}}
      />
      <FoulActionButton 
        actionName={"FOUL"} 
        action={props.foul}
        onRightClick={props.foulDecrement}
      />
      <DefActionButton 
        actionName={"off Reb"}
        action={()=>{props.incrementStat(15)}}
        onRightClick={()=>props.decrementStat(15)}
      />
      <OffActionButton 
        actionName={"def Reb"} 
        action={()=>{props.incrementStat(16)}}
        onRightClick={()=>props.decrementStat(16)}
      />
    </StyledButtonRow>
  );
}

function ButtonBoard (props) {
  return(
    <StyledButtonBoard>
      <TopButtonRow 
        increment={props.increment}
        decrement={props.decrement}
        incrementStat={props.incrementStat}
        decrementStat={props.decrementStat}
      />
      <BottomButtonRow action={props.action}
        foul={props.foul}
        foulDecrement={props.foulDecrement}
        incrementStat={props.incrementStat}
        decrementStat={props.decrementStat}
        missedAction={props.missedAction}
      />
    </StyledButtonBoard>
  );
}

function ScoreInput(props) {
  return(
    <StyledScoreInput
      value={props.score}
      onChange={props.handleChange}
      type="number"
    />
  );
}



function ScoreText(props) {
  return(
    <StyledScoreText>
      <ScoreInput 
        score={props.teamA} 
        handleChange={props.handleChangeA} 
      />
      :
      <ScoreInput 
        score={props.teamB} 
        handleChange={props.handleChangeB} 
      />
    </StyledScoreText>
  );
}

function ScoreBoard(props) {
  const lastRow = useContext(LastRowContext)
  const { send } = useSocket()

  const increment = (incrementFor) => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][3].value)
      const byPointsValue = props.spTeam1.grid[row][7 + incrementFor * 2].value
      props.setScore({ A: Number(props.score.A) + incrementFor, B: props.score.B })
      //props.spTeam1.changeValue(row, 3, cellValue + incrementFor)
      //          props.spTeam1.changeValue(row, 2, cellValue + incrementFor)
      props.spTeam1.changeValues(row, [3, (7 + incrementFor * 2)], [(Number(cellValue) + incrementFor), (byPointsValue + 1)])
      props.setQuarterScore(() => {
        const {A, B} = props.quarterScore[props.currentQuarter]
        props.quarterScore[props.currentQuarter] =
          { A: Number(props.quarterScore[props.currentQuarter].A) + incrementFor, 
            B: props.quarterScore[props.currentQuarter].B }
        return props.quarterScore
      })
      props.setByPoints(() => {
        props.byPoints[incrementFor - 1] =
          { A: Number(props.byPoints[incrementFor-1].A) + 1, B: props.byPoints[incrementFor-1].B }
        return props.byPoints
      })
    } else {
      const cellValue = Number(props.spTeam2.grid[row][3].value)
      const byPointsValue = props.spTeam1.grid[row][7 + incrementFor * 2].value
      props.setScore({ A: props.score.A, B: Number(props.score.B) + incrementFor })
      props.spTeam2.changeValues(row, [3, (7 + incrementFor * 2)], [(cellValue + incrementFor), (byPointsValue + 1)])
      props.setQuarterScore(() => {
        props.quarterScore[props.currentQuarter] =
          { A: Number(props.quarterScore[props.currentQuarter].A), 
            B: props.quarterScore[props.currentQuarter].B + incrementFor}
        return props.quarterScore
      })
      props.setByPoints(() => {
        props.byPoints[incrementFor - 1] =
          { A: props.byPoints[incrementFor-1].A, B: Number(props.byPoints[incrementFor-1].B) + 1 }
        return props.byPoints
      })
    }
  }
  const decrement = (incrementFor) => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][3].value)
      const byPointsValue = props.spTeam1.grid[row][7 - incrementFor * 2].value
      props.setScore({ A: Number(props.score.A) - incrementFor, B: props.score.B })
      //props.spTeam1.changeValue(row, 3, cellValue + incrementFor)
      //          props.spTeam1.changeValue(row, 2, cellValue + incrementFor)
      props.spTeam1.changeValues(row, [3, (7 + incrementFor * 2)], [(cellValue - incrementFor), (byPointsValue - 1)])
      props.setQuarterScore(() => {
        const {A, B} = props.quarterScore[props.currentQuarter]
        props.quarterScore[props.currentQuarter] =
          { A: Number(props.quarterScore[props.currentQuarter].A) - incrementFor, 
            B: props.quarterScore[props.currentQuarter].B }
        return props.quarterScore
      })
      props.setByPoints(() => {
        props.byPoints[incrementFor - 1] =
          { A: Number(props.byPoints[incrementFor-1].A) - 1, B: props.byPoints[incrementFor-1].B }
        return props.byPoints
      })
    } else {
      const cellValue = Number(props.spTeam2.grid[row][3].value)
      const byPointsValue = props.spTeam1.grid[row][7 - incrementFor * 2].value
      props.setScore({ A: props.score.A, B: Number(props.score.B) - incrementFor })
      props.spTeam2.changeValues(row, [3, (7 + incrementFor * 2)], [(cellValue - incrementFor), (byPointsValue - 1)])
      props.setQuarterScore(() => {
        props.quarterScore[props.currentQuarter] =
          { A: Number(props.quarterScore[props.currentQuarter].A), 
            B: props.quarterScore[props.currentQuarter].B - incrementFor}
        return props.quarterScore
      })
      props.setByPoints(() => {
        props.byPoints[incrementFor - 1] =
          { A: props.byPoints[incrementFor-1].A, B: Number(props.byPoints[incrementFor-1].B) - 1 }
        return props.byPoints
      })
    }
  }

  const missedAction = (incrementFor) => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][10 + incrementFor * 2].value)
      props.spTeam1.changeValue(row, (10+incrementFor*2), cellValue + 1)
      props.missed[incrementFor] = {A: props.missed[incrementFor].A + 1, B: props.missed[incrementFor].B}
      props.setMissed(props.missed)
    } else {
      const cellValue = Number(props.spTeam2.grid[row][10 + incrementFor * 2].value)
      props.spTeam2.changeValue(row, (10+incrementFor*2), cellValue + 1)
      props.missed[incrementFor] = {A: props.missed[incrementFor].A, B: props.missed[incrementFor].B + 1}
      props.setMissed(props.missed)
    }
  }

  const foul = () => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][4].value)
      props.setFouls({ A: Number(props.fouls.A) + 1, B: props.fouls.B })
      props.spTeam1.changeValue(row, 4, cellValue + 1)
      props.setQuarterFouls(() => {
        props.quarterFouls[props.currentQuarter] =
          { A: props.quarterFouls[props.currentQuarter].A + 1, 
            B: props.quarterFouls[props.currentQuarter].B }
        return props.quarterFouls
      })
    } else {
      const cellValue = Number(props.spTeam2.grid[row][4].value)
      props.setFouls({ A: Number(props.fouls.A), B: props.fouls.B + 1 })
      props.spTeam2.changeValue(row, 4, cellValue + 1)
      props.setQuarterFouls(() => {
        props.quarterFouls[props.currentQuarter] =
          { A: Number(props.quarterFouls[props.currentQuarter].A), 
            B: props.quarterFouls[props.currentQuarter].B +1 }
        return props.quarterFouls
      })
    }
  }

  const foulDecrement = () => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][4].value)
      props.setFouls({ A: Number(props.fouls.A) - 1, B: props.fouls.B })
      props.spTeam1.changeValue(row, 4, cellValue - 1)
      props.setQuarterFouls(() => {
        props.quarterFouls[props.currentQuarter] =
          { A: props.quarterFouls[props.currentQuarter].A - 1, 
            B: props.quarterFouls[props.currentQuarter].B }
        return props.quarterFouls
      })
    } else {
      const cellValue = Number(props.spTeam2.grid[row][4].value)
      props.setFouls({ A: Number(props.fouls.A), B: props.fouls.B - 1 })
      props.spTeam2.changeValue(row, 4, cellValue - 1)
      props.setQuarterFouls(() => {
        props.quarterFouls[props.currentQuarter] =
          { A: Number(props.quarterFouls[props.currentQuarter].A), 
            B: props.quarterFouls[props.currentQuarter].B -1 }
        return props.quarterFouls
      })
    }
  }
  const incrementStat = (col) => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][col].value)
      props.spTeam1.changeValue(row, col, cellValue + 1)
    } else {
      const cellValue = Number(props.spTeam2.grid[row][col].value)
      props.spTeam2.changeValue(row, col, cellValue + 1)
    }
  }

  const decrementStat = (col) => {
    const team = lastRow[0].team
    const row = (lastRow[0].row > 0) ? lastRow[0].row : 1

    if (team == 'A') {
      const cellValue = Number(props.spTeam1.grid[row][col].value)
      props.spTeam1.changeValue(row, col, cellValue - 1)
    } else {
      const cellValue = Number(props.spTeam2.grid[row][col].value)
      props.spTeam2.changeValue(row, col, cellValue - 1)
    }
  }


  const handleChangeA = (e) => {
    props.setScore({A:event.target.value, B: props.score.B})
  }

  const handleChangeB = (e) => {
    props.setScore({A: props.score.A, B:event.target.value})
  }

  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  return(
    <StyledScoreBoard>
      <ScoreText 
        handleChangeA={handleChangeA}
        handleChangeB={handleChangeB}
        teamA={props.score.A}
        teamB={props.score.B}
      />
      <ButtonBoard 
        increment={increment}
        decrement={decrement}
        foul={foul}
        foulDecrement={foulDecrement}
        incrementStat={incrementStat}
        decrementStat={decrementStat}
        missedAction={missedAction}
      />
    </StyledScoreBoard>
  );
}

// ========================================

export default ScoreBoard;
