import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

import tcpStrings from '../tcpStrings.js'
import ComButton from './ComButton.js'
import ComButtonSpreadsheet from './ComButtonSpreadsheet.js'

import TabSelector from './minicomponents/TabSelector.js'
import TableShow from './TableShow.js'

import { Language } from '../context.js'
import useSpreadsheet from '../hooks/useSpreadsheet.js'

const StyledPopup = styled.div`
  height: 0px;
  display: flex;
  flex-direction: row;
  overflow-y: scroll;

  ${({opened}) => opened && css`
  transition: all 0.2s ease;
  height: 350px;
  padding: 10px;
  background-color: var(--backgroundColor); 
  `}
`
const Button = styled.button`
  flex: 1; 
  background-color: var(--backgroundColor); 
  border: 1px solid var(--backgroundDarkerColor); 
  font-size: 2vw; 
  font-weight: bold;
  color: var(--textColor);
  outline: none;
  padding: 5px;

  &: hover { 
    transform: scale(1.02);
    transition: all 0.2s ease;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.25);
  }
  &: active {
    transform: scale(1);
    transition: all 0s ease;
    background-color: var(--backgroundDarkerColor);
    box-shadow: none;
  }
`
const StyledButtonBoard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`
const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  color: var(--textColor);
  flex: 1;
`
const Input = styled.input`
  border: 1px solid var(--backgroundDarkColor);
  border-radius: 4000px;
  text-align : center;
  font-size: 1em; 
  color: var(--textColor);
  flex: 1;
  margin: 5px;
  text-align: left;
  background-color: var(--backgroundColor);
  outline: none;
  padding-left: 10px;
  width: 100%;

  &:focus {
    background-color: var(--mainColor1);
    border-color: var(--mainColor1);
    color: white;
  }
`
const StyledTextCouple = styled.div`
  flex: 1;
  order: 0;
  display: flex;
  flex-direction: row;
`

const StyledButton = styled.button`
  flex: 1;
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 3vh;
  border: 0;
  padding: 0px;
  margin: 0;
  color: var(--backgroundColor);
  background-color: var(--mainColor1);
  outline: none;
  &: hover {
      background-color: var(--secondaryColor1);  
  }
  &: active {
      background-color: var(--mainColor2);  
  }

  ${({opened}) => opened && css` 
      box-shadow: 0px 0px 10px rgba(0,0,0,0.25);
  `
  }
`

function TextInput(props) {
  const [temp, setTemp] = useState('')
  return(
    <Container>
      <Title>{props.title}</Title>
      <Input 
        value={temp} 
        onChange={(event) => {
          setTemp(event.target.value);
        }} 
        onBlur={(event) => {
          props.setText(temp);
        }} 
        type="text" 
      />
    </Container>
  )
}

function TriggerButton(props) {
  return(
    <StyledButton 
      onClick={() => props.setOpened(!props.opened)}
      opened={props.opened}
    >{props.title}</StyledButton>
  )
}

function ButtonBoard(props) {
  return(
    <StyledButtonBoard>
        <ComButton 
          text={'matchID'}
          messageIn={tcpStrings.matchID.in()}
          messageKey={tcpStrings.matchID.key()}
          messageMain={tcpStrings.matchID.main(props.round, props.teamTitleA, 
            props.teamTitleB, props.logoA, props.logoB, props.location, {A:2, B: 3})}
          onClick={()=>{props.setEscCommand(tcpStrings.matchID.out())}}
        />
        <Language.Consumer>
        { language => <ComButton 
            text={'referees'}
            messageIn={tcpStrings.referees.in(language == 'eng'? `REFEREES`:`SODNIKI`)}
            messageKey={tcpStrings.referees.key()}
            messageMain={tcpStrings.referees.main(
              props.referee1 + ' (' + props.refereeCountry1 + ')', 
              props.referee2 + ' (' + props.refereeCountry2 + ')', 
              props.referee3 + ' (' + props.refereeCountry3 + ')', 
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.referees.out())}}
          />

        }
        </Language.Consumer>
    </StyledButtonBoard>
  )
}
function Popup(props) {
  console.log(`props.fixturesSheet = ${props.fixturesSheet}`)
  console.log(`props.standingsSheet =${props.standingsSheet}`)
  const standings = useSpreadsheet(props.standingsPath, props.standingsSheet)
  const fixtures = useSpreadsheet(props.fixturesPath, props.fixturesSheet)
  return(
    <StyledPopup opened={props.opened}>
      <TabSelector 
        tabs={['fixtures', 'standings']}
        contents={[
          <div>
          <TableShow 
            data={fixtures}
          /> 
          <Language.Consumer>
            {language => <ComButton 
                text={'fixtures'}
                messageIn={tcpStrings.fixtures.in(language == 'eng'? `FIXTURES ROUND ${props.round}`:`PARI ${props.round}. KROGA`)}
                messageKey={tcpStrings.fixtures.key()}
                messageMain={tcpStrings.fixtures.main(fixtures.grid)}
                onClick={() => {
                  props.setEscCommand(tcpStrings.fixtures.out())
                }}
              />
            }
          </Language.Consumer>
        </div>,
          <div>
          <TableShow 
            data={standings}
          /> 
          <Language.Consumer>
          { language =>  <ComButton 
              text={'standings'}
              messageIn={tcpStrings.standings.in(
                language == 'eng'? `STANDINGS ROUND ${props.round}`:`LESTVICA V ${props.round}. KROGU`
              )}
              messageKey={tcpStrings.standings.key()}
              messageMain={tcpStrings.standings.main(standings.grid, 'STANDINGS')}
              onClick={() => {
                props.setEscCommand(tcpStrings.standings.out())
              }}
            />
          }
          </Language.Consumer>
          </div>
        ]}
      />
      <div style={{flex: 2}}>
        <ButtonBoard 
          setEscCommand={props.setEscCommand}
          connection={props.connection}
          round={props.round}
          setRound={props.setRound}
          teamTitleA={props.teamTitleA}
          teamTitleB={props.teamTitleB}
          logoA={props.logoA}
          logoB={props.logoB}
          standingsPath={props.standingsPath}
          fixturesPath={props.fixturesPath}
          location={props.location}
          referee1={props.referee1}
          refereeCountry1={props.refereeCountry1}
          referee2={props.referee2}
          refereeCountry2={props.refereeCountry2}
          referee3={props.referee3}
          refereeCountry3={props.refereeCountry3}
        />
        <StyledTextCouple>
          <TextInput 
            title={'  location'}
            text={props.location}
            setText={props.setLocation}
          />
          <TextInput 
            style={{flex: '0.2'}}
            title={'  comentator'}
            text={props.comentator}
            setText={props.setComentator}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'  referee 1'}
            text={props.referee1}
            setText={props.setReferee1}
          />
          <TextInput 
            style={{flex: '0.2'}}
            title={'  referee 1 country'}
            text={props.refereeCountry1}
            setText={props.setRefereeCountry1}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'  referee 2'}
            text={props.referee2}
            setText={props.setReferee2}
          />
          <TextInput 
            style={{flex: '0.2'}}
            title={'  referee 2 country'}
            text={props.refereeCountry2}
            setText={props.setRefereeCountry2}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'  referee 3'}
            text={props.referee3}
            setText={props.setReferee3}
          />
          <TextInput 
            style={{flex: '0.2'}}
            title={'  referee 3 country'}
            text={props.refereeCountry3}
            setText={props.setRefereeCountry3}
          />
        </StyledTextCouple>
        <StyledTextCouple>
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'  Round'}
            text={props.round}
            setText={props.setRound}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'vrstica 1'}
            text={props.line11}
            setText={props.setLine11}
          />
          <TextInput 
            title={'vrstica 2'}
            text={props.line12}
            setText={props.setLine12}
          />
          <ComButton
            text={'two line'}
            onClick={()=>{props.setEscCommand(tcpStrings.coach.out())}}
            messageIn={tcpStrings.coach.in(props.line12)}
            messageKey={tcpStrings.coach.key()}
            messageMain={tcpStrings.coach.main( '', props.line11)}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'vrstica 1'}
            text={props.line21}
            setText={props.setLine21}
          />
          <TextInput 
            title={'vrstica 2'}
            text={props.line22}
            setText={props.setLine22}
          />
          <ComButton
            text={'two line'}
            onClick={()=>{props.setEscCommand(tcpStrings.coach.out())}}
            messageIn={tcpStrings.coach.in(props.line22)}
            messageKey={tcpStrings.coach.key()}
            messageMain={tcpStrings.coach.main( '', props.line21)}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'vrstica 1'}
            text={props.line31}
            setText={props.setLine31}
          />
          <TextInput 
            title={'vrstica 2'}
            text={props.line32}
            setText={props.setLine32}
          />
          <ComButton
            text={'two line'}
            onClick={()=>{props.setEscCommand(tcpStrings.coach.out())}}
            messageIn={tcpStrings.coach.in(props.line32)}
            messageKey={tcpStrings.coach.key()}
            messageMain={tcpStrings.coach.main( '', props.line31)}
          />
        </StyledTextCouple>
        <StyledTextCouple>
          <TextInput 
            title={'vrstica 1'}
            text={props.line41}
            setText={props.setLine41}
          />
          <TextInput 
            title={'vrstica 2'}
            text={props.line42}
            setText={props.setLine42}
          />
          <ComButton
            text={'two line'}
            onClick={()=>{props.setEscCommand(tcpStrings.coach.out())}}
            messageIn={tcpStrings.coach.in(props.line42)}
            messageKey={tcpStrings.coach.key()}
            messageMain={tcpStrings.coach.main( '', props.line41)}
          />
        </StyledTextCouple>
      </div>
    </StyledPopup>
  )
}

function StartPopup(props) {
  const [opened, setOpened] = useState(false)
  const [line11, setLine11] = useState('')
  const [line12, setLine12] = useState('')
  const [line21, setLine21] = useState('')
  const [line22, setLine22] = useState('')
  const [line31, setLine31] = useState('')
  const [line32, setLine32] = useState('')
  const [line41, setLine41] = useState('')
  const [line42, setLine42] = useState('')
  return(
    <div>
      <TriggerButton 
        opened={opened}
        setOpened={setOpened}
        title={'Start Game'}
      />
      <Popup 
        setEscCommand={props.setEscCommand}
        connection={props.connection}
        setRound={props.setRound}
        round={props.round}
        teamTitleA={props.teamTitleA}
        teamTitleB={props.teamTitleB}
        logoA={props.logoA}
        logoB={props.logoB}
        setLogoA={props.setLogoA}
        setLogoB={props.setLogoB}
        lokacija={props.lokacija}
        standingsPath={props.standingsPath}
        standingsSheet={props.standingsSheet}
        fixturesPath={props.fixturesPath}
        fixturesSheet={props.fixturesSheet}

        opened={opened}
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

        line11={line11}
        setLine11={setLine11}
        line12={line12}
        setLine12={setLine12}
        line21={line21}
        setLine21={setLine21}
        line22={line22}
        setLine22={setLine22}
        line31={line31}
        setLine31={setLine31}
        line32={line32}
        setLine32={setLine32}
        line41={line41}
        setLine41={setLine41}
        line42={line42}
        setLine42={setLine42}
        
      />
    </div>
  )
}


export default StartPopup
