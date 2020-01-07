import React, {useContext, useState} from 'react'
import styled, {css} from 'styled-components'
import useSpreadsheet from '../hooks/useSpreadsheet.js'
import {StartingPlayersContext} from '../context.js'


const StyledStartingPlayers = styled.div`
  display: flex;
  width: 100%;
  flex:1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content:flex-start;
  display: flex;
  flex-direction: row;
  font-size: 1em;
  color: var(--textColor);
  align-self: flex-start;
  vertical-align: middle;
  padding: 10px;
`
const Title = styled.span`
  margin: 2px;
  padding-right: 10px;
  vertical-align: middle;
  height: 25px;
  border: none;
  background: var(--textColor);
  font-size: 1em;
  background-color: var(--backgroundColor);
  padding-left: 10px;
  padding-right: 10px;

  display: inline-flex;
  align-items: center;
`
const PlayerTag = styled.span`
  margin: 2px;
  padding-right: 10px;
  vertical-align: middle;
  height: 25px;
  border: none;
  background-color: var(--textColor);
  font-size: 1em;
  color: var(--backgroundColor);
  padding-left: 10px;
  padding-right: 10px;

  display: inline-flex;
  align-items: center;
`
function StartingPlayers(props) {
  const [playerNames, dispatch] = useContext(StartingPlayersContext)
  return(
    <StyledStartingPlayers>
      <Title>STARTING PLAYERS: </Title>
      {playerNames.map((player, iter) => {
        return  <PlayerTag>{player.name}</PlayerTag> 
      })}
    </StyledStartingPlayers>
  )
}

export default StartingPlayers
