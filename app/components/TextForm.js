import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    background-color: var(--backgroundDarkerColor);
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Input = styled.input`
    border: 1px solid #bbbbbb;
    text-align : center;
    color: var(--textColor);
    font-size: 1vw;
    flex: 2;
    background-color: var(--backgroundColor);
`
const FormElementTitle = styled.p`
    flex: 1;
    color: var(--textColor);
    font-size: 1vw;
`

class TextInputComponent extends React.Component {
    state = { title: ' ' }
    render () {
        const change = (event) => {
            this.setState({ title: event.target.value })
        }
        return (
            <Container>
                <FormElementTitle>{this.props.elementTitle}</FormElementTitle>
                <Input value={this.state.title} onChange={change} type="text" />
            </Container>
        );
    }
}

export default TextInputComponent;
