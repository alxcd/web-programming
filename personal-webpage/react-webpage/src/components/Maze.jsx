import { useState, useEffect } from 'react'

const Maze = () => {
  const size = 9
  const initialMaze = Array(size).fill(null).map((_, rowIndex) => 
    Array(size).fill(null).map((_, colIndex) => {
      if (rowIndex % 2 === 0 || rowIndex === size - 1 || colIndex % 2 === 0 || colIndex === size - 1) {
        return 2 // Walls
      }
      return 0 // Unvisited cell
    })
  )

  const [maze, setMaze] = useState(initialMaze)


  const generateMaze = (cx, cy, maze) => {
    // using recursive backtracking method - knicked from my Java project
    const directions = [
      [0, 2], [2, 0], [0, -2], [-2, 0]
    ]
    directions.sort(() => Math.random() - 0.5)
    directions.forEach(([dx, dy]) => {
      const nx = cx + dx
      const ny = cy + dy
      if (nx >= 0 && nx < maze.length && ny >= 0 && ny < maze[0].length && maze[ny][nx] === 0) {
        maze[cy + dy / 2][cx + dx / 2] = 4 // no wall
        maze[ny][nx] = 1 // visited cell
        generateMaze(nx, ny, maze)
      }
    })
  }

  const createMaze = (y = 1, x = 1) => {
    const newMaze = [...initialMaze]
    newMaze[y][x] = 1 // Start point
    generateMaze(y, x, newMaze)
    const iExit = Math.random() > 0.5 ? 0 : newMaze.length - 1;
    const jExit = Math.random() > 0.5 ? 1 : newMaze[0].length - 2;
    newMaze[iExit][jExit] = 5 // Exit point
    setMaze(newMaze)
  }

  useEffect(() => {
    createMaze()
  }, [])

  // Function to handle cell click
  const handleCellClick = (rowIndex, colIndex) => {
    createMaze()
  }

const MazeCell = ({ cell, onClick }) => (
    <div
        onClick={onClick}
        style={{
            width: '50px',
            height: '50px',
            backgroundColor: cell === 2 ? 'black' : 'white',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
        }}
    ></div>
)

return (
  <div>
      <h1>Maze</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${maze[0].length}, 50px)` }}>
          {maze.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                  <MazeCell
                      key={`${rowIndex}-${colIndex}`}
                      cell={cell}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                  />
              ))
          )}
      </div>
  </div>
)
}

export default Maze