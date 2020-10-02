import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

import TabSelector from './minicomponents/TabSelector.js' 
 
import useSpreadsheet from '../hooks/useSpreadsheet.js'
import tcpStringsList from '../tcpStrings.js'
import { Language } from '../context.js'

import ComButtonHover from './ComButtonHover.js'
import ComButton from './ComButton.js'

const StyledPopup = styled.div`
  height: 0px;
  overflow: hidden;
  display: flex;
  display-direction: row;

  ${({opened}) => opened && css`
  transition: all 0.2s ease;
  height: 240px;
  padding: 10px;
  `}
`
const StyledColumn = styled.div`
  flex: 1;
`
const CompensationButton = styled.button`
  height: 100%;
  width: 20px;
  background: var(--backgroundColor);
  color: var(--textColor);
  border: solid 1px var(--backgroundDarkColor);
  border-radius: 15%;
  font-weight: bold;
  margin: 2px;
  &: hover {
    background-color: var(--secondaryColor1);
    color: var(--backgroundColor);
  }
`

const StyledText = styled.div`
  font-size: 15px;
  flex: 1;
  width: 100%;
  font-size: 1em; 
  text-align: center;
  color: var(--textColor)
`
const StyledButton = styled.button`
  flex: 0.5;
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 3vh;
  border: 0;
  padding: 0px;
  margin: 0;
  color: var(--backgroundColor);
  background-color: var(--mainColor1);
  outline: none;
  &: hover {
      background-color: var(--secondaryColor1);  
  }
  &: active {
      background-color: var(--mainColor2);  
  }
`

function Popup(props) {
  const getTopPlayer = (team, category, statPosition) => {
    let topPlayer = ''
    let topScore = 0
    if (team == 'A') {
      props.dataA.grid.map((player, row) => {
        if (row > 0) {
          if (player[statPosition].value > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition].value
          }
        }
      })
    } else {
      props.dataB.grid.map((player, row) => {
        if (row > 0) {
          if (player[statPosition].value > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition].value
          }
        }
      })
    }
    return  category + ' - ' + topPlayer + ': ' + topScore
  }
  const getTopFive = (team, category) => {
    let input = 0
    let output = []
    const sortFunction = (a, b) => {
      if (a[category].value == b[category].value) return 0
      else return (a[category].value < b[category].value) ? 1 : -1
    }
    if (team == 'A') {
      input = props.dataA.grid.map((element, iter) => {
        if (iter > 0) {
          return element
        }
      })
      input.sort(sortFunction)
    } else {
      input = props.dataB.grid.map((element, iter) => {
        if (iter > 0) {
          return element
        }
      })
      input.sort(sortFunction)
    }

    return [input[0], input[1], input[2], input[3], input[4]]
  }
  const getTopPlayerObject = (team, category, statPosition) => {
    let topPlayer = ''
    let topScore = 0
    if (team == 'A') {
      props.dataA.grid.map((player, row) => {
        if (row > 0) {
          if (player[statPosition].value > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition].value
          }
        }
      })
    } else {
      props.dataB.grid.map((player, row) => {
        if (row > 0) {
          if (player[statPosition].value > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition].value
          }
        }
      })
    }
    if (topPlayer == undefined || topScore == undefined) return {name: '', score: 0}
    return  {name: topPlayer, score: topScore}
  }
  const getTopPlayerZaDve = (team, category, statPosition1, statPosition2) => {
    let topPlayer = ''
    let topScore = 0
    if (team == 'A') {
      props.dataA.grid.map((player, row) => {
        if (row > 0) {
          if ((player[statPosition1].value  + player[statPosition2].value) > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition1].value  + player[statPosition2].value
          }
        }
      })
    } else {
      props.dataB.grid.map((player, row) => {
        if (row > 0) {
          if ((player[statPosition1].value  + player[statPosition2].value) > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition1].value  + player[statPosition2].value
          }
        }
      })
    }
    return  category + ' - ' + topPlayer + ': ' + topScore
  }
  const getTopPlayerZaDveObject = (team, category, statPosition1, statPosition2) => {
    let topPlayer = ''
    let topScore = 0
    if (team == 'A') {
      props.dataA.grid.map((player, row) => {
        if (row > 0) {
          if ((player[statPosition1].value  + player[statPosition2].value) > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition1].value  + player[statPosition2].value
          }
        }
      })
    } else {
      props.dataB.grid.map((player, row) => {
        if (row > 0) {
          if ((player[statPosition1].value  + player[statPosition2].value) > topScore) {
            topPlayer = player[1].value + ' ' + player[2].value
            topScore = player[statPosition1].value  + player[statPosition2].value
          }
        }
      })
    }
    if (topPlayer == undefined || topScore == undefined) return {name: '', score: 0}
    return  {name: topPlayer, score: topScore}
  }
  const showStat = (statName, statPosition, compensation) => {
    let statSumA = 0
    let statSumB = 0
    props.dataA.grid.map((data, row) => {
      if (row > 0) {
        statSumA += Number(data[statPosition].value)
      }
    })
    props.dataB.grid.map((data, row) => {
      if (row > 0) {
        statSumB += Number(data[statPosition].value)
      }
    })
    return statName + ': '+ (statSumA + compensation.A) + ' / ' + (statSumB + compensation.B)
  }
  const statSum = (statPosition, team) => {
    let sum = 0
    const data = (team == 'A' ? props.dataA.grid : props.dataB.grid)
    data.map((value, iter) => {
      if (iter > 0) {Number(sum += Number(value[statPosition].value))}
    })
    return sum
  }

  return(
    <StyledPopup opened={props.opened}>
      <StyledColumn>
        <TabSelector 
          tabs={['game leaders   ', 'top strelci  ', 'top fouls    ']}
          contents={[
          <div>
            <Language.Consumer>
              {language => <ComButton
                text={'game leaders'}
                messageIn={
                  tcpStringsList.gameLeaders.in(language == 'eng'? 'TEAM LEADERS' : 'NAJBOLJŠI IGRALCI', 
                  language == 'eng' ? ['POINTS','ASSISTS','REBOUNDS','STEALS','FOULS'] : ['TOČKE', 'PODAJE', 'SKOKI', 'UKRADENE', 'PREKRŠKI'],
                  props.teamTitleA, props.teamTitleB)
                }
                messageKey={ tcpStringsList.gameLeaders.key() }
                messageMain={
                  tcpStringsList.gameLeaders.main([
                    getTopPlayerObject('A', 'points', 3),
                    getTopPlayerObject('A', 'assist', 19),
                    getTopPlayerZaDveObject('A', 'rebounds', 16, 15),
                    getTopPlayerObject('A', 'steals', 18),
                    getTopPlayerObject('A', 'fouls', 4),
                  ],[
                    getTopPlayerObject('B', 'points', 3),
                    getTopPlayerObject('B', 'assist', 19),
                    getTopPlayerZaDveObject('B', 'rebounds', 16, 15),
                    getTopPlayerObject('B', 'steals', 18),
                    getTopPlayerObject('B', 'fouls', 4),
                  ])}
                onClick={()=>{props.setEscCommand(tcpStringsList.gameLeaders.out())}}
              />
              }
            </Language.Consumer>
            <div style={{display: 'flex'}}>
              <div style={{paddingRight:'5px'}}>
              <p style={{fontSize: "15px", fontWeight: 'bold'}}>{'home'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('A', 'points', 3) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('A', 'assist', 19) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayerZaDve('A', 'rebounds', 16, 15) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('A', 'steals', 18) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('A', 'fouls', 4) + '\n'}</p>

            </div>
            <div>
              <p style={{fontSize: "15px", fontWeight: 'bold'}}>{'away'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('B', 'points', 3) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('B', 'assist', 19) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayerZaDve('B', 'rebounds', 16, 15) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('B', 'steals', 18) + '\n'}</p>
              <p style={{fontSize: "12px",}}>{getTopPlayer('B', 'fouls', 4) + '\n'}</p>
            </div>
            </div>
          </div>, 
          <div>
            <Language.Consumer>
              {language => <ComButton
                text={'top strelci'}
                messageIn={
                  tcpStringsList.topScorers.in(language == 'eng' ? 'TOP SCORERS': 'NAJBOLJŠI STRELCI', 
                  props.teamTitleA, props.teamTitleB)
                }
                messageMain={
                  tcpStringsList.topScorers.main(
                    getTopFive('A', 3).map((player, iter) => {
                      if (player) return {name: `${player[1].value} ${player[2].value}`, score: player[3].value}
                      else return {name: '', score: 0}
                    }),
                    getTopFive('B', 3).map((player, iter) => {
                      if (player)  return {name: `${player[1].value} ${player[2].value}`, score: player[3].value}
                      else return {name: '', score: 0}
                    })
                  )}
                messageKey={ tcpStringsList.topScorers.key() }
                onClick={()=>{props.setEscCommand(tcpStringsList.topScorers.out())}}
              />
              }
            </Language.Consumer>
            <div style={{display: 'flex'}}>
              <div style={{paddingRight:'5px'}}>
              <p style={{fontSize: "15px", fontWeight: 'bold'}}>{'home'}</p>
                {getTopFive('A', 3).map((player, iter) => {
                  if (player) {
                    return <p style={{fontSize: "12px", fontWeight: 'bold'}}>{`${player[1].value} ${player[2].value} ${player[3].value}`}</p>
                }
                })}

              </div>
              <div>
                <p style={{fontSize: "15px", fontWeight: 'bold'}}>{'away'}</p>
                  {getTopFive('B', 3).map((player, iter) => {
                    if (player) {
                      return <p style={{fontSize: "12px", fontWeight: 'bold'}}>{`${player[1].value} ${player[2].value} ${player[3].value}`}</p>
                  }
                  })}
              </div>
            </div>
          </div>, 
          <div>
            <Language.Consumer>
              {language => <ComButton
                text={'top fouls'}
                messageIn={
                  tcpStringsList.topScorers.in(language == 'eng' ? 'TOP FOULS': 'NAJVEČ PREKRŠKOV', 
                  props.teamTitleA, props.teamTitleB)
                }
                messageMain={
                  tcpStringsList.topScorers.main(
                    getTopFive('A', 4).map((player, iter) => {
                      if (player) return {name: `${player[1].value} ${player[2].value}`, score: player[4].value}
                      else return {name: '', score: 0}
                    }),
                    getTopFive('B', 4).map((player, iter) => {
                      if (player)  return {name: `${player[1].value} ${player[2].value}`, score: player[4].value}
                      else return {name: '', score: 0}
                    })
                  )}
                messageKey={ tcpStringsList.topScorers.key() }
                onClick={()=>{props.setEscCommand(tcpStringsList.topScorers.out())}}
              />
                }
            </Language.Consumer>
            <div style={{display: 'flex'}}>
              <div style={{paddingRight:'5px'}}>
              <p style={{fontSize: "15px", fontWeight: 'bold'}}>{'home'}</p>
                {getTopFive('A', 4).map((player, iter) => {
                  if (player) {
                    return <p style={{fontSize: "12px", fontWeight: 'bold'}}>{`${player[1].value} ${player[2].value} ${player[4].value}`}</p>
                }
                })}

            </div>
            <div>
              <p style={{fontSize: "15px", fontWeight: 'bold'}}>{'away'}</p>
                {getTopFive('B', 4).map((player, iter) => {
                  if (player) {
                    return <p style={{fontSize: "12px", fontWeight: 'bold'}}>{`${player[1].value} ${player[2].value} ${player[4].value}`}</p>
                }
                })}
            </div>
            </div>
          </div>,]}
        />
      </StyledColumn>
      <StyledColumn>  
        <StyledText>
            { '1 point:  ' + props.byPoints[0].A + '/' + (props.byPoints[0].A + statSum(10, 'A') ) + ' : ' 
              + props.byPoints[0].B + '/' + (props.byPoints[0].B + statSum(10, 'B')) }
        </StyledText>
        <StyledText>
            { '2 point:  ' + props.byPoints[1].A + '/' + (props.byPoints[1].A + statSum(12, 'A')) + ' : ' 
              + props.byPoints[1].B + '/' + (props.byPoints[1].B + statSum(12, 'B')) }
        </StyledText>
        <StyledText>
            { '3 point:  ' + props.byPoints[2].A + '/' + ( props.byPoints[2].A + statSum(14, 'A') ) + ' : ' 
              + props.byPoints[2].B + '/' + (props.byPoints[2].B + statSum(14, 'B'))}
        </StyledText>

        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              offReb: {...props.compensation.offReb, A: props.compensation.offReb.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              offReb: {...props.compensation.offReb, A: props.compensation.offReb.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {showStat('  off rebounds', 15, props.compensation.offReb) + ' '}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              offReb: {...props.compensation.offReb, B: props.compensation.offReb.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              offReb: {...props.compensation.offReb, B: props.compensation.offReb.B - 1}})}}
          >+</CompensationButton>
        </StyledText>


        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              defReb: {...props.compensation.defReb, A: props.compensation.defReb.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              defReb: {...props.compensation.defReb, A: props.compensation.defReb.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {showStat('  def rebounds', 16, props.compensation.defReb)}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              defReb: {...props.compensation.defReb, B: props.compensation.defReb.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              defReb: {...props.compensation.defReb, B: props.compensation.defReb.B - 1}})}}
          >+</CompensationButton>
        </StyledText>
              
        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              fouls: {...props.compensation.fouls, A: props.compensation.fouls.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              fouls: {...props.compensation.fouls, A: props.compensation.fouls.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {' fouls: ' + props.fouls.A + ':' + props.fouls.B}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              fouls: {...props.compensation.fouls, B: props.compensation.fouls.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              fouls: {...props.compensation.fouls, B: props.compensation.fouls.B - 1}})}}
          >+</CompensationButton>
        </StyledText>

        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              FGs: {...props.compensation.FGs, A: props.compensation.FGs.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              FGs: {...props.compensation.FGs, A: props.compensation.FGs.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {' field goals: ' + (props.byPoints[1].A + props.byPoints[2].A) + ':' +
            (props.byPoints[1].B + props.byPoints[2].B) }
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              FGs: {...props.compensation.FGs, B: props.compensation.FGs.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              FGs: {...props.compensation.FGs, B: props.compensation.FGs.B - 1}})}}
          >+</CompensationButton>
        </StyledText>

        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              steals: {...props.compensation.steals, A: props.compensation.steals.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              steals: {...props.compensation.steals, A: props.compensation.steals.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {showStat('  steals', 18, props.compensation.steals)}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              steals: {...props.compensation.steals, B: props.compensation.steals.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              steals: {...props.compensation.steals, B: props.compensation.steals.B - 1}})}}
          >+</CompensationButton>
        </StyledText>

        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              lost: {...props.compensation.lost, A: props.compensation.lost.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              lost: {...props.compensation.lost, A: props.compensation.lost.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {showStat('  lost balls', 17, props.compensation.lost)}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              lost: {...props.compensation.lost, B: props.compensation.lost.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              lost: {...props.compensation.lost, B: props.compensation.lost.B - 1}})}}
          >+</CompensationButton>
        </StyledText>

        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              assists: {...props.compensation.assists, A: props.compensation.assists.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              assists: {...props.compensation.assists, A: props.compensation.assists.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {showStat('  assists', 19, props.compensation.assists)}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              assists: {...props.compensation.assists, B: props.compensation.assists.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              assists: {...props.compensation.assists, B: props.compensation.assists.B - 1}})}}
          >+</CompensationButton>
        </StyledText>

        <StyledText>
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              missed: {...props.compensation.missed, A: props.compensation.missed.A + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              missed: {...props.compensation.missed, A: props.compensation.missed.A - 1}})}}
          >+</CompensationButton>
          <span> </span>
          {showStat('  missed', 10, props.compensation.missed)}
          <span> </span>
          <CompensationButton
            onClick={() => {props.setCompensation({...props.compensation, 
              missed: {...props.compensation.missed, B: props.compensation.missed.B + 1}})}}
            onContextMenu={() => {props.setCompensation({...props.compensation, 
              missed: {...props.compensation.missed, B: props.compensation.missed.B - 1}})}}
          >+</CompensationButton>
        </StyledText>

      </StyledColumn>
    </StyledPopup>
  )
}


function TriggerButton(props) {
  return(
    <StyledButton 
      onClick={() => props.setOpened(!props.opened)}
    >{
      (props.opened)? props.title : ('1pt: ' + props.byPoints[0].A + ':' + props.byPoints[0].B +
                                      '  2pts: ' + props.byPoints[1].A + ':' + props.byPoints[1].B +
                                      '  3pts: ' + props.byPoints[2].A + ':' + props.byPoints[2].B +
        '  fouls: ' + props.fouls.A + ':' + props.fouls.B) + '   '}  
    </StyledButton>
  )
}

function StatisticsPopup(props) {
  const [opened, setOpened] = useState(false)
  return(
    <div>
      <TriggerButton 
        opened={opened}
        setOpened={setOpened}
        title={'Statistics'}
        byPoints={props.byPoints}
        fouls={props.fouls}
        missed={props.missed}
      />
      <Popup 
        teamTitleA={props.teamTitleA}
        teamTitleB={props.teamTitleB}
        setEscCommand={props.setEscCommand}
        connection={props.connection}
        getTopPlayer={props.getTopPlayer}
        dataA={props.dataA}
        dataB={props.dataB}
        opened={opened}
        byPoints={props.byPoints}
        fouls={props.fouls}
        missed={props.missed}
        compensation={props.compensation}
        setCompensation={props.setCompensation}
      />
    </div>
  )
}


export default StatisticsPopup
