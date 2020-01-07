import React, {useState, useReducer} from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components'

import TeamTitle           from './TeamTitle.js'
import Table               from './Table.js'
import StartingPlayers     from './StartingPlayers.js' 
import TeamSpecificActions from './TeamSpecificActions.js'
import CoachInput          from './CoachInput.js'
import TeamTimeout         from './TeamTimeout.js'


const SideContainer = styled.div`
  flex: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
`
function SidePanel(props) {
  return(
    <SideContainer>
      <TeamTitle 
        autocompletePath={props.autocompletePath}
        autocompleteSheet={props.autocompleteSheet}
        teamTitle={props.teamTitle}
        setTeamTitle={props.setTeamTitle}
        teamShort={props.teamShort}
        setTeamShort={props.setTeamShort}
        setLogo={props.setLogo}
        logo={props.logo}
      />
      <Table 
        data={props.spreadsheet}
        setRow={props.setRow} 
        team={props.team}
        playerNames={props.playerNames}
        setPlayerNames={props.setPlayerNames}
      />
      <StartingPlayers 
        setEscCommand={props.setEscCommand}
        playerNames={props.playerNames}
      />
      <TeamSpecificActions 
        teamShort={props.teamShort}
        setEscCommand={props.setEscCommand}
        coach={props.coach}
        teamTitle={props.teamTitle}
        team={props.team}
      />
      <CoachInput 
        teamTitle={props.teamTitle}
        setEscCommand={props.setEscCommand}
        coach={props.coach}
        setCoach={props.setCoach}
      />
      <TeamTimeout 
        currentQuarter={props.currentQuarter}
      />
    </SideContainer>
  );
}

export default SidePanel
