import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'
import { Language } from '../context.js'

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
      <Language.Consumer> 
        { language => <ComButton 
            text={'starting players'}
            messageIn={tcpStrings.startingPlayers.in(props.teamShort,
              language == 'eng' ? 'ON COURT' : 'NA PARKETU'
            )}
            messageMain={tcpStrings.startingPlayers.main(playerNames.map((player) => player.surname))}
            messageKey={tcpStrings.startingPlayers.key()}
            onClick={()=>{props.setEscCommand(tcpStrings.startingPlayers.out())}}
        />
        } 
      </Language.Consumer>
      <Lineup 
        coach={props.coach}
        teamTitle={props.teamTitle}
        team={props.team}
        setEscCommand={props.setEscCommand}
        data={props.data}
      />
    </TeamButtons>
  )
}

export default TeamSpecificActions
