import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Container = styled.div`
  flex: 1;
`
const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const Label = styled.label`
  flex: 1; 
  width: 100%;
  min-width: 200px;
  padding: 2px;
  border-radius: 4px;
  height: 30px;
  background-color: var(--backgroundColor); 
  border: 1px solid var(--backgroundDarkColor); 
  font-size: 1em; 
  color: var(--textColor);
  outline: none;
`
const FileDisplay = styled.div`

`


function FileSelector (props) {
  return (
    <Container>
      <Input 
        type={'file'}
        id={props.id}
        onChange={(event) => {
          console.log(event.target.files[0].path)
          props.setPath(event.target.files[0].path)
        }}
      />
      <Label 
        htmlFor={props.id}
      >{props.path}</Label>
    </Container>
  )
}



export default FileSelector
