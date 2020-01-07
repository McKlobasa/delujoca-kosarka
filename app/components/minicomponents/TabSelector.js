import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import styled, {css} from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--backgroundDarkColor);
  outline: none;
`
const TabRow = styled.div`
  flex: 1;
`
const TabContent = styled.div`
  flex: 4;
  color: var(--textColor);
`
const TabButton  = styled.button`
  height: 100%;
  width: ${props => 100 / props.tabs.length}%;
  border: 1px solid var(--backgroundDarkColor);
  color: var(--textColor);
  outline: none;
  ${({selected}) => selected && css`
  background:var(--backgroundColor);
  `}
`

function TabSelector (props) {
  const [tabSelected, setTabSelected] = useState(0)
  return(
    <Container>
      <TabRow>{props.tabs.map((tab, iter) => {
         return (<TabButton tabs={props.tabs} selected={ iter==tabSelected } onClick={() => setTabSelected(iter)}>{tab}</TabButton>)
      })}</TabRow>
      <TabContent>{props.contents[tabSelected]}</TabContent>
    </Container>
  )
}

export default TabSelector
