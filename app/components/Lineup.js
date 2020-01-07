import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import useSpreadsheet from '../hooks/useSpreadsheet.js'
import tcpStrings from '../tcpStrings.js'

import ComButton from './ComButton.js'

function Lineup(props) {
  const lineupData = useSpreadsheet(
    '../sheets/LineupWithStats.xlsx', 
    (props.team == 'A') ? 'HomeTeam' : 'AwayTeam'
  ).grid
  return (
    <ComButton
      text={'Lineup'}
      messageIn={tcpStrings.lineup.in(props.teamTitle)}
      messageMain={tcpStrings.lineup.main(lineupData, props.coach)}
      onClick={()=>{props.setEscCommand(tcpStrings.lineup.out())}}
    />
  )
}

export default Lineup
