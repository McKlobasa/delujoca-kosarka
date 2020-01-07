import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'


const Container = styled.div`
  flex:1;
`

function ElectronTest(props) {
  const { dialog } = require('electron')
  return(
    <Container>
      <input type={'file'} />
    </Container>
  )
}

export default ElectronTest
