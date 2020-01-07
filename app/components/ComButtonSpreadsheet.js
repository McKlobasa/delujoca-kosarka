import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import {useSocket} from '../hooks/useSocket'
import DisplayOnlyTable from './DisplayOnlyTable.js'

const Container = styled.div`
  flex: 1; 
  width: 100%;
  background-color: var(--backgroundColor); 
  border: 1px solid var(--backgroundDarkerColor); 
  position: relative;

`
const OnHoverContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--backgroundColor);
    transition: all 0.2s ease;
  height: 110px;  
  position: absolute;

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

function ComButton(props) {
  const { send } = useSocket()
  const [isHovered, setIsHovered] = useState(false)
  return(
    <Container>
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
        onMouseOver={() => {
          setIsHovered(true)
          console.log('is hovered')
        }}
        onMouseOut={() => setIsHovered(false)}
      >{props.text}
      </Button>
        { isHovered ? <DisplayOnlyTable data={props.data}/> : <div style={{height: '0.1px'}} />}
    </Container>
  )
}



export default ComButton
