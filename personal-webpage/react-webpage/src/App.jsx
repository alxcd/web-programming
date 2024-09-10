import Maze from "./components/Maze"
import Minesweeper from "./components/Minesweeper"
import Piano from "./components/Piano"

const App = () => {
  

  return (
  
  <div>
  <h1>My projects</h1>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      }
      }>
      <Maze />
      <Minesweeper />
    </div>
    <Piano/>
  </div>
  )
}

export default App
