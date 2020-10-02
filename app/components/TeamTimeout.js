import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'

const Half = styled.p`
  flex: 1;
  font-size: 1em; 
  text-align: center;
  color: var(--textColor);
  font-weight: bold;
  background-color: transparent;
  vertical-align: middle;
`
const Timeout = styled.div`
  flex: 0.5;
  display: flex;
  margin: 20px;
  background-color: var(--backgroundDarkerColor);
`

function TeamTimeout(props) {
  return(
    <Timeout>
      <ComButton 
        text={'timeout'}
        messageIn={tcpStrings.timeout.in()}
        messageMain={tcpStrings.timeout.main(props.teamTitle)}
        onClick={() => {
          props.setEscCommand(tcpStrings.timeout.out())
          props.setTimeout(() => {
            if (props.currentQuarter < 2) return [(props.timeout[0] + 1), props.timeout[1]]
            else return [props.timeout[0], (props.timeout[1] + 1)]
          })
        }}
        onContextMenu={() => 
          props.setTimeout(() => {
            if (props.currentQuarter < 2) return [(props.timeout[0] - 1), props.timeout[1]]
            else return [props.timeout[0], (props.timeout[1] - 1)]
          })
        }

      />
      <Half>{'1st half: ' + props.timeout[0]}</Half>
      <Half>{'2nd half: ' + props.timeout[1]}</Half>
    </Timeout>
  )
}

export default TeamTimeout
