import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'

import Lineup from './Lineup.js'
import {StartingPlayersContext} from '../context.js'

const TeamButtons = styled.div`
  flex: 4;
  max-height: 80px;
  padding: 20px;
  display:flex;
  flex-direction: row;
`

function TeamSpecificActions(props) {
  const [playerNames, dispatch] = useContext(StartingPlayersContext)
  return(
    <TeamButtons>
      <ComButton
        text={'starting players'}
        messageIn={tcpStrings.startingPlayers.in(props.teamShort)}
        messageMain={tcpStrings.startingPlayers.main(playerNames)}
        onClick={()=>{props.setEscCommand(tcpStrings.startingPlayers.out())}}
      />
      <Lineup 
        coach={props.coach}
        teamTitle={props.teamTitle}
        team={props.team}
        setEscCommand={props.setEscCommand}
      />
    </TeamButtons>
  )
}

export default TeamSpecificActions
