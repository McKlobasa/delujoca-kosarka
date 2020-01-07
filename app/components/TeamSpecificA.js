import React from 'react';
import ReactDOM from 'react-dom';

class TeamSpecificA extends React.Component {
    state = {
        scoreTeamA: 15,
        scoreTeamB: 20,
    }

    render() {
        return(
            <div style={teamSpecificA}> 
                <h1>Team specific stuff</h1>
            </div>
        );}

}


//styles

const teamSpecificA = {
    display: "flex", 
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "100px",  
    minHeight: "80px",
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
    backgroundColor: "green",
    margin: 5,
    padding: 10,
    height: "20%",

    fontSize: "2em",
    color: "#FFFFFF",


};

// ========================================

export default TeamSpecificA;
