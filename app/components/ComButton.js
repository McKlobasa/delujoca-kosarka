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
    background-color: var(--backgroundDarkerColor);
  }
  &: active {
    background-color: var(--textColor);
    color: var(--backgroundColor);
    box-shadow: none;
  }
`

function ComButton(props) {
  const { send } = useSocket()
  const [isHovered, setIsHovered] = useState(false)
  return(
    <Button 
      onClick={ () => {
        try {
          props.messageIn.map((string, iter)=>{send(string)})
          props.messageMain.map((string, iter)=>{send(string)})

          console.log(`start message is: ${props.messageIn}`)
          console.log(`main message is: ${props.messageMain}`)
        } catch {
          console.log('cannot send message')
        }

        if (typeof props.onClick === 'function') {
          props.onClick()
        }
      }} 
    >{props.text}
    </Button>
  )
}



export default ComButton
