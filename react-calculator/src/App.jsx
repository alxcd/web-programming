import { useState, useEffect } from 'react'
import { evaluate } from 'mathjs'

function App() {
  const [calcResult, setCalcResult] = useState('')
  const [calcString, setCalcString] = useState('')

  const handleInput = (event) => {
    const calcString = event.target.value
    console.log(calcString)
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
      <input onChange={handleInput}></input>
      </div>
      <br/>
      {calcResult ? (
        <div dangerouslySetInnerHTML={{ __html: `\\(${calcString} = ${calcResult}\\)` }}></div>
      ) : null}
    </>
  )
}

export default App
