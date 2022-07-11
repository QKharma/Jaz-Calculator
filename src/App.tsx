import React from 'react'
import Calculator from './components/Calculator'

function App() {
  return (
    <div>
      <div className='h-screen'>
        <div className='bg-gray-800 h-full p-1 flex flex-col'>
          <div className='text-white text-3xl font-semibold grid place-items-center h-20 mb-10'>
            Jaz Calculator
          </div>
          <Calculator />
        </div>
      </div>
    </div>
  )
}

export default App
