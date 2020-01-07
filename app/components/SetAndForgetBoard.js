import React from 'react';
import ReactDOM from 'react-dom';


class SetAndForgetBoard extends React.Component {
    state = {
        scoreTeamA: 15,
        scoreTeamB: 20,
    }

    render() {
        return(
            <div style={setAndForgetBoard}> 
                <h1>set and forget board -> tole bo colapsible</h1>
            </div>
        );}

}


//styles

const setAndForgetBoard = {
    display: "flex",      
    justifyContent: "center",     
    flexDirection: "column",     
    minWidth: "100px",       
    minHeight: "80px",         
    backgroundColor: "#7f7f7f",     
    height: "20%",    
    width: "100%",   
    color: "#FFFFFF",
    padding: 20,



};

// ========================================

export default SetAndForgetBoard;
