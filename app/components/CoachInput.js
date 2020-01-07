import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'

const Input = styled.input`
  flex: 2;
  background: transparent;
  color: var(--textColor);
  outline: none;
  font-weight: bold;
  font-size: 1em;
  padding-left:10px;
  border: none;
  height: 100%;
  width: 100%;
  &: focus {
    background-color: var(--mainColor1);
    border-color: var(--mainColor1);
    color: white;
  }
`
const Coach = styled.div`
  flex: 0.5;
  display: flex;
  margin: 20px;
  background-color: var(--backgroundDarkerColor);
`


function CoachInput(props) {
  const [coachValue, setCoachValue] = useState('')
  return(
    <Coach>
      <ComButton
        text={'Coach'}
        onClick={()=>{props.setEscCommand(tcpStrings.coach.out())}}
        messageIn={tcpStrings.coach.in()}
        messageMain={tcpStrings.coach.main( props.teamTitle, coachValue )}
      />
      <Input
        value={coachValue} 
        onChange={(event) => {setCoachValue(event.target.value)}}
        onBlur={(event) => {props.setCoach(coachValue)}}
      />
    </Coach>
  )
}



export default CoachInput
