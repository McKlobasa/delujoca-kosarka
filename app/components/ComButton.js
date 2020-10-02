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

  const sendStrings  = (preview) => {
    props.messageIn.map((string, iter) => {send(string)})
    try {
      send(props.messageKey[preview ? 3 : 1])
      send(props.messageKey[preview ? 2 : 0])
    } catch (error) {
      console.log(error)
    }
    console.log(props.messageMain)
    props.messageMain.map((string, iter) => {send(string)})

    console.log(`start message is: ${props.messageIn}`)
    console.log(`key messsage is: ${props.messageKey[preview ? 1 : 0]}`)
    console.log(`main message is: ${props.messageMain}`)
  }
  return(
    <Button 
      onClick={ () => {
        try {
          sendStrings(false)
        } catch (err) {
          console.log(err)
        }

        if (typeof props.onClick === 'function') {
          props.onClick()
        }
      }} 
      onContextMenu={() => {
        try {
          sendStrings(true)
        } catch (err) {
          console.log(err)
        }

        if (typeof props.onContextMenu === 'function') {
          props.onContextMenu()
        }
      }}
    >{props.text}
    </Button>
  )
}



export default ComButton
