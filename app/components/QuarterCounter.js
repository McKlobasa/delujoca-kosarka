import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components'
import ComButton from './ComButton.js'
import tcpStrings from '../tcpStrings.js'
import { Language } from '../context.js'

const StyledQuarterCounter = styled.div`
  display: flex;
  flex-direction: column;
  flex: ;
  padding: 20px;
  align-items: center;
  min-height: 100px;
`
const StyledData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  color: var(--textColor);
  width: 100%;
`

const StyledText = styled.div`
  font-size: 15px;
  flex: 1;
  width: 100%;
  font-size: 1em; 
  text-align: center;
`

const useStyles = makeStyles(theme => ({
  root: {
    flex: "1",
    width: '80%'
  },
  margin: {
  },
}));

const marks = [
  {
    value: 0,
    label: '1st quarter',
  },
  {
    value: 1,
    label: '2nd quarter',
  },
  {
    value: 2,
    label: '3rd quarter',
  },
  {
    value: 3,
    label: '4th quarter',
  },
  {
    value: 4,
    label: 'overtime',
  },
  {
    value: 5,
    label: 'P'
  }
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

function DiscreteSlider(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Slider
        defaultValue={0}
        max={5}
        min={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, v) => {
          props.setCurrentQuarter(v)
        }}
      />
    </div>
  );
}




function ScoreByQuarter(props) {
  return(
    <StyledData>
      <StyledText>{props.quarterScore[0].A + ':' + props.quarterScore[0].B}</StyledText>
      <StyledText>{props.quarterScore[1].A + ':' + props.quarterScore[1].B}</StyledText>
      <StyledText>{props.quarterScore[2].A + ':' + props.quarterScore[2].B}</StyledText>
      <StyledText>{props.quarterScore[3].A + ':' + props.quarterScore[3].B}</StyledText>
      <StyledText>{props.quarterScore[4].A + ':' + props.quarterScore[4].B}</StyledText>
      <StyledText>SCORE</StyledText>
    </StyledData>
  )
}
function FoulsByQuarter(props) {
  return(
    <StyledData>
      <StyledText>{props.quarterFouls[0].A + '/' + props.quarterFouls[0].B}</StyledText>
      <StyledText>{props.quarterFouls[1].A + '/' + props.quarterFouls[1].B}</StyledText>
      <StyledText>{props.quarterFouls[2].A + '/' + props.quarterFouls[2].B}</StyledText>
      <StyledText>{props.quarterFouls[3].A + '/' + props.quarterFouls[3].B}</StyledText>
      <StyledText>{(props.quarterFouls[3].A + props.quarterFouls[4].A) + '/' + 
                   (props.quarterFouls[3].B + props.quarterFouls[4].B)}</StyledText>
      <StyledText>FOULS</StyledText>

    </StyledData>
  )
}

function QuarterCounter(props) {
  const selectIn = (language) => {
      switch(props.currentQuarter) {
        case 0:
          return tcpStrings.quarter_1.in( language == 'eng'? 'RESULTS BY QUARTER' : 'REZULTATI PO ČETRTINAH', language == 'eng'? 'Q1' : '1.')
        break;
        case 1:
          return tcpStrings.quarter_2.in(language == 'eng'? 'RESULTS BY QUARTER' : 'REZULTATI PO ČETRTINAH', 
            [language == 'eng'? 'Q1' : '1.', language == 'eng'? 'Q2' : '2.'])
        break;
        case 2:
          return tcpStrings.quarter_3.in(language == 'eng'? 'RESULTS BY QUARTER' : 'REZULTATI PO ČETRTINAH', 
            [language == 'eng'? 'Q1' : '1.', language == 'eng'? 'Q2' : '2.',language == 'eng'? 'Q3' : '3.'])
        break;
        case 3:
          return tcpStrings.quarter_4.in(language == 'eng'? 'RESULTS BY QUARTER' : 'REZULTATI PO ČETRTINAH', 
            [language == 'eng'? 'Q1' : '1.', language == 'eng'? 'Q2' : '2.',language == 'eng'? 'Q3' : '3.',language == 'eng'? 'Q4' : '4.'])
        break;
        default:
          return tcpStrings.quarter_1.in( language == 'eng'? 'RESULTS BY QUARTER' : 'REZULTATI PO ČETRTINAH', language == 'eng'? 'Q1' : '1.')
    }
  }
  const selectMain = () => {
    switch(props.currentQuarter) {
      case 0:
        return tcpStrings.quarter_1.main(props.teamTitleA, props.teamTitleB, props.score, props.quarterScore)
      break;
      case 1:
        return tcpStrings.quarter_2.main(props.teamTitleA, props.teamTitleB, props.score, props.quarterScore)
      break;
      case 2:
        return tcpStrings.quarter_3.main(props.teamTitleA, props.teamTitleB, props.score, props.quarterScore)
      break;
      case 3:
        return tcpStrings.quarter_4.main(props.teamTitleA, props.teamTitleB, props.score, props.quarterScore)
      break;
      default:
        return tcpStrings.quarter_1.main(props.teamTitleA, props.teamTitleB, props.score, props.quarterScore)
    }
  }
  const selectOut = () => {
    switch(props.currentQuarter) {
      case 0:
        return tcpStrings.quarter_1.out()
      break;
      case 1:
        return tcpStrings.quarter_2.out()
      break;
      case 2:
        return tcpStrings.quarter_3.out()
      break;
      case 3:
        return tcpStrings.quarter_4.out()
      break;
      default:
        return tcpStrings.quarter_1.out()
    }
  }
  return(
    <StyledQuarterCounter>
      <DiscreteSlider 
        currentQuarter={props.currentQuarter}
        setCurrentQuarter={props.setCurrentQuarter}
      />
      <ScoreByQuarter 
        quarterScore={props.quarterScore}  
      />
      <FoulsByQuarter
        quarterFouls={props.quarterFouls}
      />
      <Language.Consumer> 
        {language => <ComButton 
          text={'score by quarters'}
          messageIn={selectIn(language)}
          messageMain={selectMain()}
          onClick={()=>{props.setEscCommand(selectOut())}}
        />
      }
      </Language.Consumer>
    </StyledQuarterCounter>
  )
}


export default QuarterCounter
