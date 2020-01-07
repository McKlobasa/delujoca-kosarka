import React, {useState, useReducer} from 'react'
import ReactDOM from 'react-dom'
import styled, {css} from 'styled-components'
import useSpreadsheet from '../hooks/useSpreadsheet.js'


const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: var(--backgroundColor)
  color: var(--textColor)
  border: 1px var(--textColor) solid
`
const Container = styled.div`
  position: relative;
  max-height: 50px; 
  flex: 3;
  margin-bottom: 15px;
`
const TextInput = styled.input`
  position: relative;
  border-style: none;
  text-align : left;
  color: #FFFFFF;
  padding: 5px;
  font-size: 40px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  background-color: #5da399;
`
const SuggsContainer = styled.div`
  height: 0px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--backgroundColor);
  position: relative;
  z-index: 1009;

  ${({showSuggestions}) => showSuggestions && css`
  height: 500px;  
  `
  }
`

function InputDropDown(props) {
  const [temp, setTemp] = useState('')
  const excelFile = useSpreadsheet('/home/klemen/Desktop/kosarkaSpreadsheets/suggestions.xlsx','Sheet1')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [tempString, setTempString] = useState('')
  return(
    <Container>
      <TextInput 
        onFocus={ () => setShowSuggestions(true) }
        onBlur={ () => {
          setShowSuggestions(false) 
          setTemp(temp)
        }}
        onChange={(event) => {
          setTemp(event.target.value)
          return values.filter(el => el.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
          }
        }
      />
      <SuggsContainer showSuggestions={showSuggestions}>
        
      </SuggsContainer>
    </Container>
  )
}

export default InputDropDown
