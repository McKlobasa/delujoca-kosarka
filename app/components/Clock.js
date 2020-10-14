import React, {useState, useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'
import {useSocket} from '../hooks/useSocket'

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: var(--backgroundColor);
  flex-direction: column;
`
const Buttons = styled.div`
  flex: 3;
  display: flex;
  background-color: var(--backgroundColor);
`
const Display = styled.p`
  flex: 1;
  text-align: center;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-size: 2em;
  font-weight: bold;
`

function Clock(props) {
  const { send } = useSocket()
  const [clockIsIn, setClockIsIn] = useState(false)
  const [time, setTime] = useState('10:00')
  const [attack, setAttack] = useState('24')
  const [clockMode, setClockMode] = useState('manual')
  console.log(clockMode)


  const callBackendAPI = async () => {
    if (clockMode == 'manual') {
      try {
        const response = await fetch(`http://${props.clockIP}:5555/rocna_ura`);
        const responseContent = await response.json();
      
        if (response.status !== 200) {
          console.log('bad response')
        } else {
          setTime(responseContent.time)
          setAttack(responseContent.attack)
        }
        return responseContent
      } catch {
        console.log('clock not connected')
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(callBackendAPI, 200)
    return () => clearInterval(interval)
  }) 


  useEffect(() => {
    if (clockIsIn) {
    console.log('it is updated')
      tcpStrings.clock.main(time, attack,props.teamShortA, props.teamShortB, 
        props.currentQuarter + 1, props.score.A, props.score.B, props.logoA, props.logoB,
        {A: props.timeoutA[Math.floor(props.currentQuarter / 2)], B: props.timeoutB[Math.floor(props.currentQuarter / 2)]}, 
        props.quarterFouls[props.currentQuarter]).map((string, iter) => {send(string)})
    }
  }, [props.teamShortA, props.teamShortB, props.currentQuarter, props.score, props.logoA, props.logoB, props.quarterFouls[props.currentQuarter], props.quarterFouls, props.timeoutA, props.timeoutB, time, attack])

  return (
    <Container>
      <Display>
        {`${time}   ${attack}`}
        <select style={{backgroundColor: 'white', border: 'none', outline: 'none', color:'grey', marginLeft: '20px', outline: 'none'}} onChange={(event) => setClockMode(event.target.value)}>
          <option value="manual">MANUAL</option>
          <option value="bypassed">BYPASSED</option>
        </select> 
      </Display>
      <Buttons>
        <ComButton 
          text={'Clock IN'}
          messageIn={tcpStrings.clock.in()}
          messageKey={tcpStrings.clock.key()}
          messageMain={ clockMode == 'manual' ?
            tcpStrings.clock.main(time, attack, props.teamShortA, props.teamShortB, 
              props.currentQuarter + 1, props.score.A, props.score.B, props.logoA, props.logoB, 
              {A: props.timeoutA[Math.floor(props.currentQuarter / 2)], B: props.timeoutB[Math.floor(props.currentQuarter / 2)]}, 
            props.quarterFouls[props.currentQuarter]) :
            tcpStrings.clock.main2( props.teamShortA, props.teamShortB, 
              props.currentQuarter + 1, props.score.A, props.score.B, props.logoA, props.logoB, 
              {A: props.timeoutA[Math.floor(props.currentQuarter / 2)], B: props.timeoutB[Math.floor(props.currentQuarter / 2)]}, 
            props.quarterFouls[props.currentQuarter])} 
          onClick={()=>{setClockIsIn(true)}}
        />
        <ComButton 
          text={'Clock OUT'}
          messageIn={tcpStrings.clock.out()}
          messageMain={[]}
          onClick={()=>{setClockIsIn(false)}}
        />
      </Buttons>
    </Container>
  )
}

export default Clock
