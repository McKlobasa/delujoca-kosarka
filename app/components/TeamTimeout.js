import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'

const Half = styled.p`
  flex: 1;
  font-size: 1em; 
  text-align: center;
  color: var(--textColor);
  font-weight: bold;
  background-color: transparent;
  vertical-align: middle;
`
const Button = styled.button`
  flex: 1; 
  width: 100%;
  background-color: var(--backgroundColor); 
  border: 1px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  font-weight: bold;
  color: var(--textColor);
  outline: none;
  flex-grow: 1;
  padding: 5px;

  &: hover { 
    background-color: var(--backgroundDarkerColor);
  }
  &: active {
    background-color: var(--textColor);
    color: var(--backgroundColor);
    box-shadow: none;
  }
`
const Timeout = styled.div`
  flex: 0.5;
  display: flex;
  margin: 20px;
  background-color: var(--backgroundDarkerColor);
`

function TeamTimeout(props) {
  const [timeout, setTimeout] = useState([0, 0])
  return(
    <Timeout>
      <Button 
        onClick={() => 
          setTimeout(() => {
            if (props.currentQuarter < 2) return [(timeout[0] + 1), timeout[1]]
            else return [timeout[0], (timeout[1] + 1)]
          })}
        onContextMenu={() => 
          setTimeout(() => {
            if (props.currentQuarter < 2) return [(timeout[0] - 1), timeout[1]]
            else return [timeout[0], (timeout[1] - 1)]
          })}

      >{'Timeout'}</Button>
      <Half>{'1st half: ' + timeout[0]}</Half>
      <Half>{'2nd half: ' + timeout[1]}</Half>
    </Timeout>
  )
}

export default TeamTimeout
