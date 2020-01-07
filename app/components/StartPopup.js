import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

import tcpStrings from '../tcpStrings.js'
import ComButton from './ComButton.js'
import ComButtonSpreadsheet from './ComButtonSpreadsheet.js'

import TabSelector from './minicomponents/TabSelector.js'
import TableShow from './TableShow.js'

import useSpreadsheet from '../hooks/useSpreadsheet.js'

const StyledPopup = styled.div`
  height: 0px;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;

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
  flex: 1
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
          messageMain={tcpStrings.matchID.main(props.round, props.teamTitleA, 
            props.teamTitleB, props.logoA, props.logoB, props.location, {A:2, B: 3})}
          onClick={()=>{props.setEscCommand(tcpStrings.matchID.out())}}
        />
        <ComButton 
          text={'referees'}
          messageIn={tcpStrings.referees.in('ABA_2017_18')}
          messageMain={tcpStrings.referees.main(
            props.referee1 + ' (' + props.refereeCountry1 + ')', 
            props.referee2 + ' (' + props.refereeCountry2 + ')', 
            props.referee3 + ' (' + props.refereeCountry3 + ')', 
          )}
          onClick={()=>{props.setEscCommand(tcpStrings.referees.out())}}

        />
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
          <ComButton 
            text={'fixtures'}
            messageIn={tcpStrings.fixtures.in()}
            messageMain={tcpStrings.fixtures.main(fixtures.grid)}
            onClick={()=>{
              props.setEscCommand(tcpStrings.fixtures.out())
            }}
          /></div>,
          <div>
          <TableShow 
            data={standings}
          /> 
          <ComButton 
            text={'standings'}
            messageIn={tcpStrings.standings.in('ABA_2017_18')}
            messageMain={tcpStrings.standings.main(standings.grid, props.round)}
            onClick={()=>{
              props.setEscCommand(tcpStrings.standings.out())
            }}
          /></div>
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
            style={{flex: '0.3'}}
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
            style={{flex: '0.3'}}
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
            style={{flex: '0.3'}}
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
      </div>
    </StyledPopup>
  )
}

function StartPopup(props) {
  const [opened, setOpened] = useState(false)
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
        
      />
    </div>
  )
}


export default StartPopup
