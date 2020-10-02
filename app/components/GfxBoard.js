import React, { useContext, useEffect }from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'
import { Language } from '../context.js'

import {useSocket} from '../hooks/useSocket.js'
import useKey from '../hooks/useKey.js'

import { TeamName, LastRowContext } from '../context.js'

const Container = styled.div`
  display: flex;
  flex: 1
  flex-direction: row;
  width: 100%;
  border: 1px solid var(--backgroundDarkerColor);
`
const Column = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  align-context: stretch;
  overflow-x: hidden;
`
const Title = styled.div`
  width: 100%;
  height: 20px;
  padding: 2px;
  color: var(--textColor);
  font-size: 18px;
  font-weight: bold;
  background-color: var(--backgroundDarkerColor);
  text-align: center;
`

function GfxBoard(props) {
  const { send } = useSocket()

  ////////////// KEYBINDINGS /////////////
  const f1_IsPressed = useKey('F1')
  const f2_IsPressed = useKey('F2')
  const f3_IsPressed = useKey('F3')
  const f4_IsPressed = useKey('F4')
  const f5_IsPressed = useKey('F5')
  const f6_IsPressed = useKey('F6')
  const f7_IsPressed = useKey('F7')

  useEffect(()=>{
    if (f1_IsPressed) {
 console.log('burekman')
      console.log("F1 pressed")
      tcpStrings.podpis_points.in().map((string, iter)=>{send(string)})
      tcpStrings.podpis_points.main(
        ['1 Pt: ', 'POINTS'],
        getLastPlayerData(2),
        getAbr(),
        getLastPlayerData(3),
        {scored: getLastPlayerData(9), 
          all: getLastPlayerData(9) + getLastPlayerData(10)},
        getPercent(getLastPlayerData(9), getLastPlayerData(9) + getLastPlayerData(10)),
      ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.podpis_points.out())
    }
  }, [f1_IsPressed])

  useEffect(()=>{
    if (f2_IsPressed) {
      console.log("F2 pressed")
      tcpStrings.podpis_points.in().map((string, iter)=>{send(string)})
      tcpStrings.podpis_points.main(
        ['FGs: ', 'POINTS'],
        getLastPlayerData(2),
        getAbr(),
        getLastPlayerData(3),
        {scored: getLastPlayerData(11) + getLastPlayerData(13), 
          all: getLastPlayerData(11) + getLastPlayerData(12) + getLastPlayerData(13) + getLastPlayerData(14)},
        getPercent(getLastPlayerData(11) + getLastPlayerData(13), getLastPlayerData(11) + getLastPlayerData(12) + getLastPlayerData(13) + getLastPlayerData(14)),
      ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.podpis_points.out())
      }}, [f2_IsPressed])

  useEffect(()=>{
    if (f3_IsPressed) {
      console.log("F3 pressed")
      tcpStrings.podpis_points.in().map((string, iter)=>{send(string)})
      tcpStrings.podpis_points.main(
        ['3 Pts: ', 'POINTS'],
        getLastPlayerData(2),
        getAbr(),
        getLastPlayerData(3),
        {scored: getLastPlayerData(13), 
          all: getLastPlayerData(13) + getLastPlayerData(14)},
        getPercent(getLastPlayerData(13), getLastPlayerData(13) + getLastPlayerData(14)),
      ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.podpis_points.out())
    }
  }, [f3_IsPressed])
  useEffect(()=>{
    if (f4_IsPressed) {
      console.log("F4 pressed")
      tcpStrings.podpis_points.in().map((string, iter)=>{send(string)})
      tcpStrings.podpis_points.main(
        ['2 Pts: ', 'POINTS'],
        getLastPlayerData(2),
        getAbr(),
        getLastPlayerData(3),
        {scored: getLastPlayerData(11), 
          all: getLastPlayerData(11) + getLastPlayerData(12)},
        getPercent(getLastPlayerData(11), getLastPlayerData(11) + getLastPlayerData(12)),
      ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.podpis_points.out())
      }}, [f4_IsPressed])


  useEffect(()=>{
    if (f5_IsPressed) {
      console.log("F5 pressed")
      tcpStrings.foulsPodpis.in().map((string, iter)=>{send(string)})
      tcpStrings.foulsPodpis.main(
        'Fouls: ',
        getLastPlayerData(2),
        getAbr(),
        getLastPlayerData(4),
      ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.foulsPodpis.out())
    }
  }, [f5_IsPressed])

  useEffect(()=>{
    if (f6_IsPressed) {
      console.log("F6 pressed")
      tcpStrings.reboundsPodpis.in().map((string, iter)=>{send(string)})
      tcpStrings.reboundsPodpis.main(
        'Rebounds: ',
        getLastPlayerData(2),
        getAbr(),
        {off: getLastPlayerData(15), def: getLastPlayerData(16)},
      ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.foulsPodpis.out())
    }
  }, [f6_IsPressed])

  useEffect(()=>{
    if (f7_IsPressed) {
      console.log("F6 pressed")
      tcpStrings.assistsPodpis.in().map((string, iter)=>{send(string)})
      tcpStrings.assistsPodpis.main(
            'Assists: ',
            getLastPlayerData(2),
            getAbr(),
            getLastPlayerData(19),
          ).map((string, iter)=>{send(string)})
      props.setEscCommand(tcpStrings.assistsPodpis.out())
    }
  }, [f7_IsPressed])
  /////////////// end KEYBINDINGS //////////////

  const [lastRow, something] = useContext(LastRowContext)
  const getLastPlayerData = (position) => {
    if ( lastRow.team == 'A' ) {
      if ( props.dataA.grid[lastRow.row] != undefined ) {
        return  props.dataA.grid[lastRow.row][position].value
      } else {
        return ' '
      }
    } else {
      if ( props.dataB.grid[lastRow.row] != undefined ) {
        return props.dataB.grid[lastRow.row][position].value   
      } else {
        return ' '
      }
    }
  }
  const getAbr = () => {
    if ( lastRow.team == 'A' ) {
      return props.teamShortA
    } else {
      return props.teamShortB
    }
  }
  const getPercent = (a, b) => {
    if ( b > 0 ) {
      return Math.round(100 * a / b)
    } else {
      return 0
    }
  }
            
  const statSum = (statPosition, team) => {
    let sum = 0
    const data = (team == 'A' ? props.dataA.grid : props.dataB.grid)
    data.map((value, iter) => {
      if (iter > 0) {Number(sum += Number(value[statPosition].value))}
    })
    return sum
  }
  return (
    <Container>
      <Column>
        <Title>PODPISI</Title>
        <Language.Consumer> 
        { language => <ComButton 
            style={{width: '100%'}}
            text={'Free throws (F1)'}
            messageIn={tcpStrings.podpis_points.in()}
            messageKey={tcpStrings.podpis_points.key()}
            messageMain={tcpStrings.podpis_points.main(
              language == 'eng' ? ['1 Pt: ', 'POINTS'] : ['za 1 točko: ', 'TOČK'],
              getLastPlayerData(2),
              getAbr(),
              getLastPlayerData(3),
              {scored: getLastPlayerData(9), 
                all: getLastPlayerData(9) + getLastPlayerData(10)},
              getPercent(getLastPlayerData(9), getLastPlayerData(9) + getLastPlayerData(10))
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.podpis_points.out())}}
          />
        } 
      </Language.Consumer>
        <Language.Consumer> 
          { language => <ComButton 
            style={{width: '100%'}}
            text={'2 points (F2)'}
            messageIn={tcpStrings.podpis_points.in()}
            messageKey={tcpStrings.podpis_points.key()}
            messageMain={tcpStrings.podpis_points.main(
              language == 'eng' ? ['2 Pts: ', 'POINTS'] : ['za 2 točki: ', 'TOČK'],
              getLastPlayerData(2),
              getAbr(),
              getLastPlayerData(3),
              {scored: getLastPlayerData(11), 
                all: getLastPlayerData(11) + getLastPlayerData(12)},
              getPercent(getLastPlayerData(11), getLastPlayerData(11) + getLastPlayerData(12)),
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.podpis_points.out())}}
            />
          } 
        </Language.Consumer>
        <Language.Consumer> 
        { language => <ComButton 
            style={{width: '100%'}}
            text={'3 points (F3)'}
            messageIn={tcpStrings.podpis_points.in()}
            messageKey={tcpStrings.podpis_points.key()}
            messageMain={tcpStrings.podpis_points.main(
              language == 'eng' ? ['3 Pts: ', 'POINTS'] : ['za 3 točke: ', 'TOČK'],
              getLastPlayerData(2),
              getAbr(),
              getLastPlayerData(3),
              {scored: getLastPlayerData(13), 
                all: getLastPlayerData(13) + getLastPlayerData(14)},
              getPercent(getLastPlayerData(13), getLastPlayerData(13) + getLastPlayerData(14)),
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.podpis_points.out())}}
          />
        } 
      </Language.Consumer>
      </Column>
      <Column>
        <Title>PODPISI</Title>
        <Language.Consumer> 
        { language => <ComButton 
            style={{width: '100%'}}
            text={'fouls (F4)'}
            messageIn={tcpStrings.foulsPodpis.in()}
            messageKey={tcpStrings.foulsPodpis.key()}
            messageMain={tcpStrings.foulsPodpis.main(
              language == 'eng' ? 'Fouls: ' : 'Prekrški:  ',
              getLastPlayerData(2),
              getAbr(),
              getLastPlayerData(4),
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.foulsPodpis.out())}}
          />
        } 
      </Language.Consumer>
      <Language.Consumer> 
        { language => <ComButton 
            style={{width: '100%'}}
            text={'rebounds (F5)'}
            messageIn={tcpStrings.reboundsPodpis.in()}
            messageKey={tcpStrings.reboundsPodpis.key()}
            messageMain={tcpStrings.reboundsPodpis.main(
              language == 'eng' ? 'Rebounds: ' : 'Skoki:  ',
              getLastPlayerData(2),
              getAbr(),
              {off: getLastPlayerData(15), def: getLastPlayerData(16)},
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.foulsPodpis.out())}}
          />
        } 
        </Language.Consumer>
      <Language.Consumer>
        { language => <ComButton 
            style={{width: '100%'}}
            text={'assists (F6)'}
            messageIn={tcpStrings.assistsPodpis.in()}
            messageKey={tcpStrings.assistsPodpis.key()}
            messageMain={tcpStrings.assistsPodpis.main(
              language == 'eng' ? 'Assists: ' : 'Podaje: ',
              getLastPlayerData(2),
              getAbr(),
              getLastPlayerData(19)
            )}
            onClick={()=>{props.setEscCommand(tcpStrings.assistsPodpis.out())}}
          />
        } 
        </Language.Consumer>
      </Column>
      <Column>
        <Title>SMALL STATS</Title>
        <ComButton
          style={{width: '100%'}}
          text={'stat by points'}
          messageIn={tcpStrings.byPoints.in('statistics', useContext(TeamName).A, 
            useContext(TeamName).B, props.score)}
          messageKey={tcpStrings.byPoints.key()}
          messageMain={tcpStrings.byPoints.main(props.byPoints, props.missed)}
          onClick={()=>{props.setEscCommand(tcpStrings.byPoints.out())}}

        />
        <ComButton
          style={{width: '100%'}}
          text={'steal / lost balls'}
          messageIn={tcpStrings.stealLostBalls.in('statistics', useContext(TeamName).A, useContext(TeamName).B, props.score)}
          messageKey={tcpStrings.stealLostBalls.key()}
          messageMain={tcpStrings.stealLostBalls.main(
            {A: statSum(18, 'A'), B: statSum(18, 'B')},
            {A: statSum(17, 'A'), B: statSum(17, 'B')},
            {A: statSum(19, 'A'), B: statSum(19, 'B')},
          )}
          onClick={()=>{props.setEscCommand(tcpStrings.stealLostBalls.out())}}
        />
        <ComButton
          style={{width: '100%'}}
          text={'FGs / rebounds'}
          messageIn={tcpStrings.rebounds.in('statistics', useContext(TeamName).A, 
            useContext(TeamName).B, props.score)}
          messageKey={tcpStrings.rebounds.key()}
          messageMain={tcpStrings.rebounds.main(
            {A: {
              points: props.byPoints[1].A + props.byPoints[2].A,
              missed: statSum(12, 'A') + statSum(14, 'A')
              }, 
             B: {
              points: props.byPoints[1].B + props.byPoints[2].B,
              missed: statSum(12, 'B') + statSum(14, 'B')
            }},
            {A: statSum(16, 'A'), B: statSum(16, 'B')},
            {A: statSum(15, 'A'), B: statSum(15, 'B')},
          )}
          onClick={()=>{props.setEscCommand(tcpStrings.rebounds.out())}}
            style={{flex: '0.3'}}
        />
      <Column>
        <Title>BIG STATS</Title>
        <Language.Consumer>
          {language => <ComButton 
            style={{width: '100%'}}
            text={'half time stats'}
            messageIn={tcpStrings.halfTime.in(language == 'eng'? 'HALF TIME STATISTICS': 'STATISTIKA OB POLČASU')}
            messageKey={tcpStrings.halfTime.key()}
            messageMain={tcpStrings.halfTime.main(props.teamTitleA, props.teamTitleB,
              [statSum(3, 'A'), `${props.byPoints[0].A} / ${statSum(9,'A') + statSum(10,'A')}`, 
                `${props.byPoints[1].A} / ${statSum(11,'A') + statSum(12,'A')}`,
                `${props.byPoints[2].A} / ${statSum(13,'A') + statSum(14,'A')}`,
                Math.round((statSum(11, 'A') + statSum(13,'A'))/(statSum(11,'A') + statSum(12,'A') + statSum(13,'A') + statSum(14,'A'))*100), 
                statSum(16, 'A') + statSum(15, 'A'), 
                statSum(19, 'A'),statSum(4, 'A')
              ], 
              [statSum(3, 'B'), `${props.byPoints[0].B} / ${statSum(9,'B') + statSum(10,'B')}`, 
                `${props.byPoints[1].B} / ${statSum(11,'B') + statSum(12,'B')}`,
                `${props.byPoints[2].B} / ${statSum(13,'B') + statSum(14,'B')}`,
                Math.round((statSum(11, 'B') + statSum(13,'B'))/(statSum(11,'B') + statSum(12,'B') + statSum(13,'B') + statSum(14,'B'))*100), 
                statSum(16, 'B') + statSum(15, 'B'), 
                statSum(19, 'B'),statSum(4, 'B')
              ], 
              language == 'eng'? ['POINTS', 'FREE THROWS', "2 POINTS", "3 POINTS", "FGs %", "REBOUNDS", "ASSISTS", "FOULS"]:
                ["TOČKE", "PROSTI METI", "ZA DVE TOČKI", "ZA TRI TOČKE", "METI", "SKOKI", "PODAJE", "PREKRŠKI"])}
            onClick={()=>{props.setEscCommand(tcpStrings.halfTime.out())}}
          />
        }
        </Language.Consumer>
        <Language.Consumer>
          {language => <ComButton 
            style={{width: '100%'}}
            text={'full time stats'}
            messageIn={tcpStrings.halfTime.in(language == 'eng'? 'FULL TIME STATISTICS': 'STATISTIKA OB KONCU TEKME')}
            messageKey={tcpStrings.halfTime.key()}
            messageMain={tcpStrings.halfTime.main(props.teamTitleA, props.teamTitleB,
              [statSum(3, 'A'), `${props.byPoints[0].A} / ${statSum(9,'A') + statSum(10,'A')}`, 
                `${props.byPoints[1].A} / ${statSum(11,'A') + statSum(12,'A')}`,
                `${props.byPoints[2].A} / ${statSum(13,'A') + statSum(14,'A')}`,
                Math.round((statSum(11, 'A') + statSum(13,'A'))/(statSum(11,'A') + statSum(12,'A') + statSum(13,'A') + statSum(14,'A'))*100), 
                statSum(16, 'A') + statSum(15, 'A'), 
                statSum(19, 'A'),statSum(4, 'A')
              ], 
              [statSum(3, 'B'), `${props.byPoints[0].B} / ${statSum(9,'B') + statSum(10,'B')}`, 
                `${props.byPoints[1].B} / ${statSum(11,'B') + statSum(12,'B')}`,
                `${props.byPoints[2].B} / ${statSum(13,'B') + statSum(14,'B')}`,
                Math.round((statSum(11, 'B') + statSum(13,'B'))/(statSum(11,'B') + statSum(12,'B') + statSum(13,'B') + statSum(14,'B'))*100), 
                statSum(16, 'B') + statSum(15, 'B'), 
                statSum(19, 'B'),statSum(4, 'B')
              ], 
              language == 'eng'? ['POINTS', 'FREE THROWS', "2 POINTS", "3 POINTS", "FGs %", "REBOUNDS", "ASSISTS", "FOULS"]:
                ["TOČKE", "PROSTI METI", "ZA DVE TOČKI", "ZA TRI TOČKE", "METI", "SKOKI", "PODAJE", "PREKRŠKI"])}
            onClick={()=>{props.setEscCommand(tcpStrings.halfTime.out())}}
          />
        }
        </Language.Consumer>
      </Column>

      </Column>
    </Container>
  )
}

export default GfxBoard
