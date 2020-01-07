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
  padding: 5px;

  &: active {
    transform: scale(1);
    transition: all 0s ease;
    background-color: var(--backgroundDarkerColor);
    box-shadow: none;
  }
`
const OnHoverContainer = styled.div`
  height: 0px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--backgroundColor);
    transition: all 0.2s ease;

  ${({isHovered}) => isHovered && css`
  height: 110px;  
    transition: all 0.2s ease;
  `
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

        console.log(`start message is: ${props.messageIn}`)
        console.log(`main message is: ${props.messageMain}`)

        if (typeof props.onClick === 'function') {
          props.onClick()
        }
      }} 
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >{props.text}
        {<OnHoverContainer isHovered={isHovered}>{props.hoverChild}</OnHoverContainer>}
    </Button>
  )
}



export default ComButton
