import React from 'react'
import Calculator from './components/Calculator'

function App() {
  return (
    <div>
      <div className='h-screen'>
        <div className='bg-gray-800 h-full p-1 flex flex-col items-center'>
          <h1 className='text-white text-3xl font-semibold grid place-items-center h-20 mb-10'>
            Jaz Calculator
          </h1>
          <Calculator />
        </div>
      </div>
    </div>
  )
}

export default App
