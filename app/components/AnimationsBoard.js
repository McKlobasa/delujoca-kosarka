import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import tcpStrings from '../tcpStrings.js'
import * as net from 'net'   

const Button = styled.button`
  flex: 4; 
  background-color: var(--backgroundColor); 
  border: 1px solid var(--backgroundDarkerColor); 
  font-size: 1em; 
  font-weight: bold;
  color: var(--textColor);
  outline: none;
  padding: 5px;

  &: hover { 
    transform: scale(1.02);
    transition: all 0.2s ease;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.25);
  }
  &: active {
    transform: scale(1);
    transition: all 0s ease;
    background-color: var(--backgroundDarkerColor);
    box-shadow: none;
  }

`
const ButtonPanel = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  align-context: stretch;
`

const GroupName = styled.p `
  flex: 1;
  font-size: 1vw;
  color: var(--mainColor1);
`

const TriggerBoardStyle = styled.div `
  flex: 8;
  display: flex;
  min-height: 160px;
  flex-direction: row;
  padding: 3px;
  align-items: stretch;
  align-context: space-between;
`
const Container = styled.div `
  flex: 0.8.8.8.8.8.8.8.8;
  display: flex;      
  justify-content: stretch;     
  flex-direction: column;       
  background-color: #eeeeee;  
  color: #7f7f7F;

`
function TriggerButton (props) {
  return (
    <Button 
      onClick={ () => {
        props.tcpString.map( (MessageString, stringNumber) => {
        })
      }} 
    >{props.name}</Button>)
}


function ButtonGroup ({ip, port, groupName, buttons}) {
  return(
    <ButtonPanel>
      {
        buttons.map((button, iter) => 
        <TriggerButton 
          key={iter}
          name={button.name} 
          tcpString={button.message}
          ip={ip}
          port={port}
        />) 
      }
    </ButtonPanel>
  )
}

const smallStatistics = {
  matchID: {
    name: "matchID",
    message:[
    ],
  },
  throws: {
    name: "free throws/2pt/3pt",
    message:["knof 2"],
  },
  rebounds: {
    name: "rebounds",
    message:["knof 3"],
  },
  lostBalls: {
    name: "Steals/lostBalls",
    message:["knof 4"],
  }
}

const podpisi = {
  podpis1: {
    name:"prosti meti",
    message: ["0 "+'RENDERER SET_OBJECT SCENE*Summer_League/PLAYOUT/2Line'+'\0', 
              "0 "+'RENDERER*STAGE*DIRECTOR*$2Line_IN START'+'\0']
  },

  podpis2: {
    name:"FGs",
    message: ["FGs"]
  },

  podpis3: {
    name:"trojke",
    message: ["trojke"]
  },

  podpis4: {
    name:"dvojke",
    message: ["dvojke"]
  },

  podpis5: {
    name:"osebne",
    message: ["osebne"]
  },

  podpis6: {
    name:"rebounds",
    message: ["rebounds"]
  },


  podpis7: {
    name:"assist",
    message: ["assist"]
  },


}
function TriggerBoard (props) {
  return(
    <TriggerBoardStyle>
      <ButtonGroup 
        ip={props.ip}
        port={props.port}

        groupName={"Podpisi"} 
        buttons={[  podpisi.podpis1,
                    podpisi.podpis2,
                    podpisi.podpis3,
                    podpisi.podpis4,
                  ]} 
      />
      <ButtonGroup 
        ip={props.ip}
        port={props.port}

        groupName={""} 
        buttons={[  podpisi.podpis5,
                    podpisi.podpis6,
                    podpisi.podpis7,
                  ]} 
      />
      <ButtonGroup 
        ip={props.ip}
        port={props.port}
        groupName={"druge animacije"} 
        buttons={[  smallStatistics.throws,
                    smallStatistics.rebounds,
                    smallStatistics.lostBalls,
                  ]} 
      />
    </TriggerBoardStyle>
  );
}

function AnimationsBoard (props) {
  return(
    <Container> 
      <TriggerBoard 
        ip={props.connection.ip}
        port={props.connection.port}
      />
    </Container>
  );
}

export default AnimationsBoard;
