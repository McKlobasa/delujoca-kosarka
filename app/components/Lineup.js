import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import useSpreadsheet from '../hooks/useSpreadsheet.js'
import tcpStrings from '../tcpStrings.js'
import { Language } from '../context.js'

import ComButton from './ComButton.js'

function Lineup(props) {
  const lineupData = useSpreadsheet(
    '../sheets/LineupWithStats.xlsx', 
    (props.team == 'A') ? 'HomeTeam' : 'AwayTeam'
  ).grid
  return (
    <Language.Consumer>
    {  language => <ComButton
        text={'Lineup'}
        messageIn={tcpStrings.lineup.in(props.teamTitle, language == 'eng'? `ROSTER ${props.teamTitle}`:`postava ${props.teamTitle}`)}
        messageKey={tcpStrings.lineup.key()}
        messageMain={tcpStrings.lineup.main(props.data, props.coach)}
        onClick={() => {
          props.setEscCommand(tcpStrings.lineup.out())
          console.log(props.data)
        }}
      />
    }
    </Language.Consumer>
  )
}

export default Lineup
