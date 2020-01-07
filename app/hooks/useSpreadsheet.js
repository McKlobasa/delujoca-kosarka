import React, { useState, useEffect } from 'react'
import XLSX from 'xlsx';

const aVal = 'A'.charCodeAt(0)
const zVal = 'Z'.charCodeAt(0)

function letterComboToNumber (combo) {
  let nr = 0
  combo.split('').reverse().forEach((value, power) => {
    nr += value.charCodeAt(0) - aVal * ((zVal - aVal) ** power)
  })
  return nr
}

function keyToPosition (key) {
  const keyRegex = /([A-Z]*)([0-9]*)/g
  const [res, colCombo, row] = keyRegex.exec(key)
  if (!res) return null
  const col = letterComboToNumber(colCombo)
  return { col, row: Number(row) - 1, key }
}

function getArrayFromKeys (positions, values) {
  const width = Math.max(...positions.map(pos => pos.col)) + 1
  const height = Math.max(...positions.map(pos => pos.row)) + 1
  let table = []
  for (let y = 0; y < height; y++) {
    table[y] = []
    for (let x = 0; x < width; x++) {
      table[y][x] = { value: "" }
    }
  }
  positions.forEach(({col, row, key}) => {
    table[row][col].value = values[key].v
  })
  return table
}

function useSpreadsheet (file, spreadsheet) {
  const [grid, setGrid] = useState([])


  function changeValue (row, column, value) {
    setGrid(grid.map((rowValue, rowNumber) => {
      if (rowNumber === row) {
        return rowValue.map((columnValue, columnNumber) => {
          if (columnNumber === column) {
            return { value }
          } else {
            return columnValue
          }
        })
      } else {
        return rowValue
      }
    }))
  }

  function changeValues (row, columns, values) {
    setGrid(grid.map((rowValue, rowNumber) => {
      if (rowNumber === row) {
        return rowValue.map((columnValue, columnNumber) => {
          let tempValue = columnValue
          columns.map((column, iter) => {
            if (columnNumber === column) {
              tempValue = { value: values[iter] }
            } 
          })
          return tempValue
        })
      } else {
        return rowValue
      }
    }))
  }

  
  useEffect(() => {
    try {
      const databaseXLSX = XLSX.readFile(file);
      const positions = Object.keys(databaseXLSX.Sheets[spreadsheet])
        .map(key => keyToPosition(key))
        .filter(a => a)
      const grid = getArrayFromKeys(
        positions, databaseXLSX.Sheets[spreadsheet]
      )
      setGrid(grid)
    } catch {
      console.log(`${file} does not exist`)
      setGrid([
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],
      [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
       {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},],

      ])
    }
  }, [file, spreadsheet])

  function onCellsChanged (changes) {
    const newGrid = grid.map(row => [...row])
    changes.forEach(({cell, row, col, value}) => {
      newGrid[row][col] = {...newGrid[row][col], value}
    })
    setGrid(newGrid)
  }

  //console.log(grid)
  return {
    grid,
    onCellsChanged,
    changeValue,
    changeValues,
  }
}

export default useSpreadsheet
