import React, {useState, useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'
import {useSocket} from '../hooks/useSocket'

const Container = styled.div`
  flex:1;
  display: flex;
  background-color: var(--backgroundColor);
  flex-direction: column;
`
const Buttons = styled.div`
  flex:3;
  display: flex;
  background-color: var(--backgroundColor);
`
const Display = styled.p`
  flex:1;
  text-align: center;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-size: 2em;
  font-weight: bold;
`

function Clock(props) {
  const [time, setTime] = useState({ data : undefined }) 
  useEffect(() => {
        callBackendAPI()
          .then(res => {
            try {
              setTime({ data: res.express })
            } catch {
              console.log('effect mori')
            }
          })
          .catch(err => console.log(err));
  }) 
  const callBackendAPI = async () => {
    try {
      const response = await fetch('http://localhost:5555/express_backend');
      const body = await response.json();
      if (response.status !== 200) {
      }
      return body;
    } catch {
      console.log('ura ne dela')
    }
  };

  const { send } = useSocket()
  const [clockIsIn, setClockIsIn] = useState(false)

  useEffect(() => {
    if (clockIsIn) {
      tcpStrings.clock.main('10:00', props.teamShortA, props.teamShortB, 
        props.currentQuarter + 1, props.score.A, props.score.B, props.logoA, props.logoB,
        {A: 2, B: 3}, props.quarterFouls[props.currentQuarter]).map((string, iter)=>{send(string)})
    }
  }, [props.teamShortA, props.teamShortB, props.currentQuarter, props.score, props.logoA, props.logoB, props.quarterFouls])
  return(
    <Container>
      <Display>
        {time.data}
      </Display>
      <Buttons>
        <ComButton 
          text={'Clock IN'}
          messageIn={tcpStrings.clock.in()}
          messageMain={ tcpStrings.clock.main('10:00', props.teamShortA, props.teamShortB, 
            props.currentQuarter + 1, props.score.A, props.score.B, props.logoA, props.logoB, {A: 2, B: 3}, props.quarterFouls[props.currentQuarter])}
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
