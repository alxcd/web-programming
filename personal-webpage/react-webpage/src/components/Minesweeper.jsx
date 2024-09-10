import { useState, useEffect } from 'react'


const Minesweeper = () => {
  let ySize, xSize
  const createMinesArray = (ySize = 8, xSize = 10) => {
    const array = Array(ySize).fill(null).map(() => Array(xSize).fill(0))
    let minesCount = ySize * xSize / 8
    while (minesCount > 0) {
      console.log(minesCount)
      let xRandom = Math.floor(Math.random() * xSize)
      let yRandom = Math.floor(Math.random() * ySize)
      if (array[yRandom][xRandom] == -1) continue
      array[yRandom][xRandom] = -1
      minesCount--
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (yRandom + i >= 0 && yRandom + i < ySize && xRandom + j >= 0 && xRandom + j < xSize)
          {
              if (array[yRandom + i][xRandom + j] != -1) { array[yRandom + i][xRandom + j]++ }
          }
        }
      }
    }
    return array
  }

  ySize = 8
  xSize = 10
  const [grid, setGrid] = useState(() => createMinesArray(ySize, xSize))


  // useEffect(() => {
  //   console.log('grid',grid)
  // }, [grid])


  const GridCell = ({ cell, onClick}) => (
    <div
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: cell < 9 ? 'gray' : cell === 19 ? 'black' : 'white',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        justifyContent: 'center',
        display: 'flex',
        color: cell === 19 ? 'red' : 'black',
        fontSize: '30px',
        alignItems: 'center'
      }}
    >
    {cell === 19 ? 'M' : cell >= 10 ? cell - 10 : ''}
  </div>
  )

  const handleCellClick = (rowIndex, colIndex) => {
    let isGameOver
    console.log(grid[rowIndex][colIndex])
    const newGrid = grid.map((row, rIndex) =>
    row.map((cell, cIndex) => {
      if (rIndex === rowIndex && cIndex === colIndex) {
        switch (cell) {
          case -1:
            isGameOver = true
            return 19
          case 0:
             drawCellAdjacentToZero(rowIndex, colIndex)
             return 10
          default:
            return cell < 9 ? cell + 10 : cell
        }
      }
      return cell
    })
  )
  setGrid(newGrid)
  if (isGameOver) gameOver()
  }

  const gameOver = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => (cell === -1 ? 19 : cell))
    )
    setGrid(newGrid)

    console.log('Game over')
    console.log('gameover newGrid',newGrid)
    console.log('gameover grid',grid)
  }

  const drawCellAdjacentToZero = async(rowIndex, colIndex) => {
    console.log('draw cells adjacent to zero')
    // const newGrid = grid.map(async (row, rIndex) =>
    // row.map( async (cell, cIndex) => {
    //   if (cell > 0 && cell < 9) {cell += 10}
    //   console.log(cell)
    //   console.log(rowIndex, colIndex)
    //   console.log(rIndex, cIndex)
    //   if (rIndex === rowIndex && cIndex === colIndex && cell == 0) {
    //     for (let i = -1; i < 2; i++)
    //       {
    //           for (let j = -1; j < 2; j++)
    //           {
    //               if (rowIndex + i >= 0 && rowIndex + i < ySize && colIndex + j >= 0 && colIndex + j < xSize)
    //               { 
    //                 console.log('draw 0')
    //                 await drawCellAdjacentToZero(rowIndex + i, colIndex + j)
    //               }
    //           }
    //       }

    //   }
    // }))
    // setGrid(newGrid)
  }

  const restartGame = () => {
    setGrid(createMinesArray(ySize, xSize))
  }

  return (
  <div>
    <h1>Minesweeper(with Natalia)</h1>
    <button onClick={restartGame}>Restart</button>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 50px)` }}>
        {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
           ))
        )}
    </div>
  </div>
)}

export default Minesweeper