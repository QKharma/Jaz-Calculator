import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'

import Calculator from './components/Calculator'
import NavbarButton from './components/NavbarButton'
import OvertimeCalculator from './components/OvertimeCalculator'

function App() {
  return (
    <Router>
      <div className='h-screen'>
        <nav className='flex flex-col absolute h-full p-3 lg:justify-center justify-end space-y-3'>
          <NavbarButton path='/calculator1' icon='clock' />
          <NavbarButton path='/calculator2' icon='clock2' />
        </nav>
        <div className='bg-gray-800 h-full p-3 flex flex-col items-center'>
          <h1 className='text-white text-4xl font-semibold grid place-items-center'>
            Jaz Calculator
          </h1>
          <div className='h-full grid place-items-center'>
            <Routes>
              <Route path='/' element={<Navigate to='/calculator1' />}></Route>
              <Route
                path='/calculator1'
                element={<OvertimeCalculator />}
              ></Route>
              <Route path='/calculator2' element={<Calculator />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
