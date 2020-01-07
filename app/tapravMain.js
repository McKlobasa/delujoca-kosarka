import React, {useState, useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components'

import SidePanel   from './components/SidePanel.js'
import MiddlePanel from './components/MiddlePanel.js'

import useSpreadsheet from './hooks/useSpreadsheet.js'
import {SocketProvider, useSocket} from './hooks/useSocket.js'
import tcpStringsList from './tcpStrings.js'

import { LastRowContext, StartingPlayersContext, ConnectionContext, TeamName, LastGfxCommandContext } from './context.js'
import * as net from 'net'

// za desni klik, da onemogoc od chroma menije
document.addEventListener('contextmenu', function(event){
  event.preventDefault();})

const GlobalStyle = createGlobalStyle`
  :root {
    --backgroundColor: #FFFFFF;
    --backgroundDarkerColor: #eeeeee;
    --backgroundDarkColor: #d9d9d9;
    --mainColor1: #5da399;
    --mainColor2: #011936;
    --secondaryColor1: #8dbfb7;
    --textColor: #757575;
  }
  #root {
    height: 100%
  }
  body {
    font-family: sans-serif;
    background: var(--backgroundColor);
    height: 100%;
    width: 100%;
    margin: 0;
    position: relative;
  }
  html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`
  const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`


const startingPlayersReducer = (state = [], action) => {
  switch(action.type) {
    case 'toggle': {
      const player = state.find((p) => p == action.player)
      if (player) {
        return state.filter((p)=> p != action.player)
      } else {
        return state.concat(action.player)
      }
    }
    default: return state
  }
}

function MainContainer() {
  useEffect(() => {

  })
  const [connection, setConnection] = useState({ ip:'192.168.250.148', port:6100 })
  const [isOpened, setIsOpened] = useState(false)
  const setIP = (event) => {
    setConnection({
      ip: event.target.value,
      port: connection.port
    })
  }
  const setPort = (event) => {
    if (event.target.value > 0 && event.target.value < 65536)
    setConnection({
      ip: connection.ip,
      port: Number(event.target.value)
    })
  }
  const [escCommand, setEscCommand] = useState('')
  const [excelPath, setExcelPath] = 
    useState("/home/klemen/Desktop/kosarkaSpreadsheets/LineupWithStats.xlsx")
  const [standingsPath, setStandingsPath] = 
    useState('/home/klemen/Desktop/kosarkaSpreadsheets/lestvica_aba.xls')
  const [fixturesPath, setFixturesPath] = 
    useState("/home/klemen/Desktop/kosarkaSpreadsheets/fixtures.xls")

  const spTeam1 = useSpreadsheet(excelPath, 'HomeTeam')
  const spTeam2 = useSpreadsheet(excelPath, 'AwayTeam')
  const [teamTitleA, setTeamTitleA] = useState('TeamTitleA')
  const [teamTitleB, setTeamTitleB] = useState('TeamTitleB')
  const [teamShortA, setTeamShortA] = useState('XXX')
  const [teamShortB, setTeamShortB] = useState('XXX')
  const [timeout, setTimeout] = useState({A: 0, B: 0})

  /*STATS*/
  const [score, setScore] = useState({A:0, B:0})
  const [fouls, setFouls] = useState({A:0, B:0})
  const [missed, setMissed] = useState([{A:0, B:0},{A:0, B:0},{A:0, B:0}])
  const [quarter, setQuarter] = useState(1)
  const [quarterScore, setQuarterScore] = useState([{A:0,B:0},{A:0,B:0},{A:0,B:0},{A:0,B:0},{A:0,B:0}])
  const [quarterFouls, setQuarterFouls] = useState([{A:0,B:0},{A:0,B:0},{A:0,B:0},{A:0,B:0},{A:0,B:0}])
  const [byPoints, setByPoints] = useState([{A:0,B:0},{A:0,B:0},{A:0,B:0}])
  const [currentQuarter, setCurrentQuarter] = useState(0)

  const [playerArrayA, setPlayerArrayA] = useState([])
  const [playerArrayB, setPlayerArrayB] = useState([])
  const [playerNamesA, setPlayerNamesA] = useState([])
  const [playerNamesB, setPlayerNamesB] = useState([])

  /*start DATA*/
  const [referee, setReferee] = useState([{name: '', country: ''},{name: '', country: ''},{name: '', country: ''}])
  const [logoA, setLogoA] = useState('')
  const [logoB, setLogoB] = useState('')
  const [round, setRound] = useState('')
  const [coachA, setCoachA] = useState('')
  const [coachB, setCoachB] = useState('')
  const [location, setLocation] = useState('')
  const [komentator, setKomentator] = useState('')
  const [matchIdAdd, setMatchIdAdd] = useState(['','',''])
  const [referee1, setReferee1] = useState('')
  const [referee2, setReferee2] = useState('')
  const [referee3, setReferee3] = useState('')
  const [refereeCountry1, setRefereeCountry1] = useState('')
  const [refereeCountry2, setRefereeCountry2] = useState('')
  const [refereeCountry3, setRefereeCountry3] = useState('')

  const startingPlayersLeft = useReducer(startingPlayersReducer, [])
  const startingPlayersRight= useReducer(startingPlayersReducer, [])

  const [lastRow, setLastRow] = useState({row: 0, team: 'A'})
  
  return (
    <SocketProvider connection={connection}>
      <TeamName.Provider value={{A: teamTitleA, B: teamTitleB}}>
      <LastRowContext.Provider value={[lastRow, setLastRow]}>
        <Main>
          <GlobalStyle />
          <StartingPlayersContext.Provider value={startingPlayersLeft}>
            <SidePanel 
              setEscCommand={setEscCommand}
              connection={connection}
              excelPath={excelPath} 
              spreadsheet={spTeam1} 
              team={'A'}
              teamTitle={teamTitleA}
              setTeamTitle={setTeamTitleA}
              teamShort={teamShortA}
              setTeamShort={setTeamShortA}
              currentQuarter={currentQuarter}
              setRow={setLastRow}
              playerNames={playerNamesB}
              setPlayerNames={setPlayerNamesB}
              coach={coachA}
              setCoach={setCoachA}
              setLogo={setLogoA}
              logo={logoA}
            />
          </StartingPlayersContext.Provider>
          <MiddlePanel
            escCommand={escCommand}
            excelLineup={excelPath} 
            setExcelLineup={setExcelPath}
            standingsPath={standingsPath}
            setStandingsPath={setStandingsPath}
            fixturesPath={fixturesPath}
            setFixturesPath={setFixturesPath}
            spTeam1={spTeam1}
            spTeam2={spTeam2}
            connection={connection}
            setIP={setIP}
            setEscCommand={setEscCommand}
            setPort={setPort}

            score={score}
            teamShortA={teamShortA}
            teamShortB={teamShortB}
            teamTitleA={teamTitleA}
            teamTitleB={teamTitleB}
            setScore={setScore}
            fouls={fouls}
            setFouls={setFouls}
            currentQuarter={currentQuarter}
            setCurrentQuarter={setCurrentQuarter}
            quarterScore={quarterScore}
            setQuarterScore={setQuarterScore}
            quarterFouls={quarterFouls}
            setQuarterFouls={setQuarterFouls}
            byPoints={byPoints}
            setByPoints={setByPoints}
            missed={missed}
            setMissed={setMissed}

            round={round}
            setRound={setRound}
            logoA={logoA}
            logoB={logoB}
            setLogoA={setLogoA}
            setLogoB={setLogoB}
            location={location}
            setLocation={setLocation}
            referee={referee}
            setReferee={setReferee}
            komentator={komentator}
            setKomentator={setKomentator}
            matchIdAdd={matchIdAdd}
            setMatchIdAdd={setMatchIdAdd}
            referee1={referee1}
            setReferee1={setReferee1}
            refereeCountry1={refereeCountry1}
            setRefereeCountry1={setRefereeCountry1}
            referee2={referee2}
            setReferee2={setReferee2}
            refereeCountry2={refereeCountry2}
            setRefereeCountry2={setRefereeCountry2}
            referee3={referee3}
            setReferee3={setReferee3}
            refereeCountry3={refereeCountry3}
            setRefereeCountry3={setRefereeCountry3}
          />
          <StartingPlayersContext.Provider value={startingPlayersRight}>
            <SidePanel 
              setEscCommand={setEscCommand}
              connection={connection}
              excelPath={excelPath} 
              spreadsheet={spTeam2} 
              team={'B'}
              teamTitle={teamTitleB}
              setTeamTitle={setTeamTitleB}
              teamShort={teamShortB}
              setTeamShort={setTeamShortB}
              currentQuarter={currentQuarter}
              setRow={setLastRow}
              playerNames={playerNamesB}
              setPlayerNames={setPlayerNamesB}
              coach={coachB}
              setCoach={setCoachB}
              setLogo={setLogoB}
              logo={logoB}
            />
          </StartingPlayersContext.Provider>
        </Main>
      </LastRowContext.Provider>
      </TeamName.Provider>
    </SocketProvider>
  )
}

export default MainContainer;
