import React from 'react'
import TimeInput from './components/TimeInput'

function App() {
  return (
    <div>
      <div className='h-screen'>
        <div className='bg-gray-800 h-full p-1 flex flex-col'>
          <div className='text-[white] text-3xl font-semibold text-center'>
            Jaz Calculator
          </div>
          <div className='grid place-content-center'>
            <div className='bg-gray-800 border-2 rounded-xl border-black p-1 grid grid-cols-1'>
              <TimeInput name='Morning' />
              <TimeInput name='Lunch start' />
              <TimeInput name='Lunch end' />
              <TimeInput name='End of Work' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
