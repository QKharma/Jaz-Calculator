import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'

import LeaveCalculator from './components/LeaveCalculator'
import NavbarButton from './components/NavbarButton'
import OvertimeCalculator from './components/OvertimeCalculator'

function App() {
  return (
    <Router>
      <div className='bg-gray-800 h-screen overflow-y-auto flex flex-col'>
        <h1 className='text-white text-6xl font-bold grid place-items-center pt-4'>
          JAZ Calculator
        </h1>
        <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 grow'>
          <nav className='flex flex-col h-full p-3 justify-center lg:items-start items-center order-1 space-y-3'>
            <NavbarButton
              name='Overtime Calculator'
              path='/OvertimeCalculator'
              icon='clock'
            />
            <NavbarButton
              name='Leave Time Calculator'
              path='/LeaveCalculator'
              icon='clock2'
            />
          </nav>
          <div className='h-full p-3 flex flex-col lg:justify-center justify-end lg:order-2 2xl:col-span-2 lg:col-span-2'>
            <div className='grid place-items-center'>
              <Routes>
                <Route
                  path='/'
                  element={<Navigate to='/OvertimeCalculator' />}
                ></Route>
                <Route
                  path='/OvertimeCalculator'
                  element={<OvertimeCalculator />}
                ></Route>
                <Route
                  path='/LeaveCalculator'
                  element={<LeaveCalculator />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
