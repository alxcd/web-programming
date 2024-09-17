import { useState, useEffect } from 'react'
import { evaluate } from 'mathjs'
import './App.css'

function App() {
  const [calcResult, setCalcResult] = useState('')
  const [calcString, setCalcString] = useState('')

  const handleInput = (event) => {
    const calcString = event.target.value
    setCalcString(calcString)
    const result = evaluate(calcString)
    if (typeof result !== 'object') { setCalcResult(result)}
  }

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset()
    }
  }, [calcResult])

  return (
    <>
      <div>
      <textarea onChange={handleInput}></textarea>
      </div>
      <br/>
      {calcResult ? (
        <div dangerouslySetInnerHTML={{ __html: `\\(${calcString} = ${calcResult}\\)` }}></div>
      ) : null}
    </>
  )
}

export default App
