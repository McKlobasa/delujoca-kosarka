import React, {useState, useEffect, useReducer} from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components'
import useKey from '../hooks/useKey.js'
import {useSocket} from '../hooks/useSocket'

import ScoreBoard        from './ScoreBoard.js'
import QuarterCounter    from './QuarterCounter.js'
import StatisticsPopup   from './StatisticsPopup.js'
import StartPopup        from './StartPopup.js'
import SettingsPanel     from './SettingsPanel.js'
import Clock             from './Clock.js'
import GfxBoard          from './GfxBoard.js'

import { remote } from 'electron'

const dialogOptions = {
  properties: 'openFile'
}

const Middle = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  border: 2px solid var(--backgroundDarkerColor);
  overflow-x: scroll;
`
function MiddlePanel(props) {
  const { send } = useSocket()
  const escIsPressed = useKey('Escape')
  const [compensation, setCompensation] = useState({
    offReb: {A: 0, B: 0},
    defReb: {A: 0, B: 0},
    fouls: {A: 0, B: 0},
    FGs: {A: 0, B: 0},
    steals: {A: 0, B: 0},
    lost: {A: 0, B: 0},
    assists: {A: 0, B: 0},
    missed: {A: 0, B: 0},
  })
  const [clockIP, setClockIP] = useState('localhost')
  const handleClick = () => {
    remote.dialog.showOpenDialogSync(dialogOptions, (index) => {
      console.log('information-dialog-selection', index);
    });
  }

  useEffect(()=>{
    if (escIsPressed) {
      console.log('useEffect is triggered')
      send(props.escCommand)
      props.setEscCommand('')
    }
  })

  return(
    <Middle>
      <ScoreBoard
        spTeam1={props.spTeam1}
        spTeam2={props.spTeam2}

        score={props.score}
        setScore={props.setScore}
        fouls={props.fouls}
        setFouls={props.setFouls}
        missed={props.missed}
        setMissed={props.setMissed}
        connection={props.connection}
        quarterScore={props.quarterScore}
        setQuarterScore={props.setQuarterScore}
        quarterFouls={props.quarterFouls}
        setQuarterFouls={props.setQuarterFouls}
        currentQuarter={props.currentQuarter}
        setCurrentQuarter={props.setCurrentQuarter}
        byPoints={props.byPoints}
        setByPoints={props.setByPoints}
      />
      <StatisticsPopup 
        setEscCommand={props.setEscCommand}
        connection={props.connection}
        dataA={props.spTeam1}
        dataB={props.spTeam2}
        byPoints={props.byPoints}
        fouls={props.fouls}
        missed={props.missed}
        compensation={compensation}
        setCompensation={setCompensation}
        teamTitleA={props.teamTitleA}
        teamTitleB={props.teamTitleB}
      /> 
      <GfxBoard 
        teamTitleA={props.teamTitleA}
        teamTitleB={props.teamTitleB}
        teamShortA={props.teamShortA}
        teamShortB={props.teamShortB}
        setEscCommand={props.setEscCommand}
        connection={props.connection}
        score={props.score}
        byPoints={props.byPoints}
        fouls={props.fouls}
        missed={props.missed}
        dataA={props.spTeam1}
        dataB={props.spTeam2}
      />
      <QuarterCounter 
        currentQuarter={props.currentQuarter}
        setCurrentQuarter={props.setCurrentQuarter}
        quarterScore={props.quarterScore}
        setQuarterScore={props.setQuarterScore}
        quarterFouls={props.quarterFouls}
        setQuarterFouls={props.setQuarterFouls}
        teamTitleA={props.teamTitleA}Hover
        teamTitleB={props.teamTitleB}
        score={props.score}
        setEscCommand={props.setEscCommand}
      />
      <Clock 
        timeoutA={props.timeoutA}
        timeoutB={props.timeoutB}
        currentQuarter={props.currentQuarter}
        score={props.score}
        teamShortA={props.teamShortA}
        teamShortB={props.teamShortB}
        fouls={props.fouls}
        logoA={props.logoA}
        logoB={props.logoB}
        quarterFouls={props.quarterFouls}
        clockIP={clockIP}
      />
      <StartPopup
        standingsPath={props.standingsPath}
        fixturesPath={props.fixturesPath}
        standingsSheet={props.standingsSheet}
        fixturesSheet={props.fixturesSheet}
        setEscCommand={props.setEscCommand}
        round={props.round}
        setRound={props.setRound}
        teamTitleA={props.teamTitleA}
        teamTitleB={props.teamTitleB}
        connection={props.connection}
        setLogoA={props.setLogoA}
        setLogoB={props.setLogoB}
        logoA={props.logoA}
        logoB={props.logoB}
        coachA={props.coachA}
        setCoachA={props.setCoachA}
        coachB={props.coachB}
        setCoachB={props.setCoachB}
        location={props.location}
        setLocation={props.setLocation}
        komentator={props.komentator}
        setKomentator={props.setKomentator}
        setMatchIdAdd={props.setMatchIdAdd}
        matchIdAdd={props.matchIdAdd}
        referee1={props.referee1}
        setReferee1={props.setReferee1}
        refereeCountry1={props.refereeCountry1}
        setRefereeCountry1={props.setRefereeCountry1}
        referee2={props.referee2}
        setReferee2={props.setReferee2}
        refereeCountry2={props.refereeCountry2}
        setRefereeCountry2={props.setRefereeCountry2}
        referee3={props.referee3}
        setReferee3={props.setReferee3}
        refereeCountry3={props.refereeCountry3}
        setRefereeCountry3={props.setRefereeCountry3}
      />
      <SettingsPanel 
        setLanguage={props.setLanguage}
        clockIP={clockIP}
        setClockIP={setClockIP}
        logoA={props.logoA}
        logoB={props.logoB}
        setLogoA={props.setLogoA}
        setLogoB={props.setLogoB}
        standingsPath={props.standingsPath}
        standingsSheet={props.standingsSheet}
        fixturesSheet={props.fixturesSheet}
        setStandingsSheet={props.setStandingsSheet}
        setStandingsPath={props.setStandingsPath}
        fixturesPath={props.fixturesPath}
        setFixturesPath={props.setFixturesPath}
        setFixturesSheet={props.setFixturesSheet}
        excelLineup={props.excelLineup}
        setExcelLineup={props.setExcelLineup}
        connection={props.connection}
        setIP={props.setIP}
        setPort={props.setPort}
        autocompletePath={props.autocompletePath}
        autocompleteSheet={props.autocompleteSheet}
        setAutocompletePath={props.setAutocompletePath}
        setAutocompleteSheet={props.setAutocompleteSheet}
      />
    </Middle>
  );
}

export default MiddlePanel
