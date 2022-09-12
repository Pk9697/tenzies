import React from 'react'
import Die from './Die'
function App() {

  return (
    <div className='app-container'>
      <div className='app'>
        <div className="dice-container">
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
            <Die value="1" />
        </div>
      </div>
    </div>
  )
}

export default App
