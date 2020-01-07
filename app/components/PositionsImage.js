import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Positions from '../images/positions.png'

const ImageContainer = styled.img`
  width: 95%;
`

function PositionsImage(props) {
  return(
    <ImageContainer src={Positions} />
  )
}

export default PositionsImage
