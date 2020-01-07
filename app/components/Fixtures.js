import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import {useSocket} from '../hooks/useSocket'

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

function ComButton(props) {
  const { send } = useSocket()
  const [isHovered, setIsHovered] = useState(false)
  return(
    <Button 
      onClick={ () => {
        props.messageIn.map((string, iter)=>{send(string)})
        props.messageMain.map((string, iter)=>{send(string)})
        console.log(props.messageIn)
        console.log(props.messageMain)
        if (typeof props.onClick === 'function') {
          props.onClick()
        }
      }} 
    >{props.text}
    </Button>
  )
}



export default ComButton
