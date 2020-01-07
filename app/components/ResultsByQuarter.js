import React, {PropTypes, Components} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledResultsByQuarter = styled.div`
  flex:1;
  display: flex;
  flex-direction: row;
  background-color: var(--backgroundColorDarker);

`
const StyledQuarter = styled.div`
  flex:1;
  background-color: var(--backgroundColor);
  margin 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.25);
  font-size: 2em;
  color: var(--textColor);
  font-weight: bold;
  text-align: center;

`
const StyledTitle = styled.div`
  flex:1;
  margin 5px;
  font-size: 2em;
  font-weight: bold;
  color: var(--textColor);
  text-align: center;
`

function Quarter(props) {
  return(
    <StyledQuarter>{props.quarter + '.   ' + props.result}</StyledQuarter>
  )
}

function Title(props) {
  return(
    <StyledTitle>RESULTS BY QUARTER</StyledTitle>
  )
}

function ResultsByQuarter(props) {
  return(
    <StyledResultsByQuarter>
      <Title />
      <Quarter
        result={'0:0'}
        quarter={1}
      />
      <Quarter
        result={'0:0'}
        quarter={2}
      />
      <Quarter
        result={'0:0'}
        quarter={3}
      />
      <Quarter
        result={'0:0'}
        quarter={4}
      />
    </StyledResultsByQuarter>
  )
}

export default ResultsByQuarter
