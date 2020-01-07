import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Container = styled.div`
  flex: 1;
  flex-direction:row;
  flex-wrap: nowrap;
  position:relative;
  height: 100%;
  width: 100%;
  align-items: stretch;
`
const Input = styled.input`
  background-color: var(--backgroundColor);
  border: 1px solid var(--backgroundDarkColor);
  border-radius: 4px;
  height: 25px;
  margin: 5px;
  padding: 3px;
  color: var(--textColor);
  outline: none;
  &:focus {
    background-color: var(--backgroundDarkColor);
  }
`
const Submit = styled.button`
  flex: 1; 
  width: 20%;
  border-radius: 4px;
  height: 30px;
  background-color: var(--backgroundDarkerColor); 
  border: 1px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  font-weight: bold;
  color: var(--textColor);
  outline: none;
  padding: 5px;
  &: active {
    background-color: var(--textColor);
    color: var(--backgroundColor);
  }
`


function fastTextInput (props) {
  const [tempText, setTempText] = useState(props.text)
  
  return (
    <Container>
      <Input 
        onChange={(event) => setTempText(event.target.value)}
        onBlur={(event) => props.setText(tempText)}
      />
      <Submit 
        onClick={(event) => props.setText(tempText)}
      >OK</Submit>
    </Container>
  )
}



export default fastTextInput
