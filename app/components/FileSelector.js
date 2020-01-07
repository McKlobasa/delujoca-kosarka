import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'

function FileInput(props) {
  const [path, setPath] = useState('burek')
  return (
    <input type="file"  
      onChange={(event)=>{
        setPath(event.target.files[0].path)
        console.log(event.target.files)
      }} 
    />
  )
}
export default FileInput
