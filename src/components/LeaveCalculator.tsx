import { useEffect, useState } from 'react'
import getLocalStorageNumber from '../lib/getLocalStorageNumber'
import getLunchTimeMin from '../lib/getLunchTimeMin'
import msToString from '../lib/msToString'
import TimeInput from './TimeInput'

const LeaveCalculator = () => {
  const [morning, setMorning] = useState(0)
  const [lunchStart, setLunchStart] = useState(0)
  const [lunchEnd, setLunchEnd] = useState(0)
  const [goalWorkTime, setgoalWorkTime] = useState(0)
  const [leaveTime, setLeaveTime] = useState(0)

  const clearTimes = () => {
    setMorning(0)
    setLunchStart(0)
    setLunchEnd(0)
    setgoalWorkTime(0)
    setLeaveTime(0)
  }

  const showLeaveTime = () => {
    if (
      morning !== 0 &&
      lunchStart !== 0 &&
      lunchEnd !== 0 &&
      goalWorkTime !== 0
    ) {
      let lunchTime = lunchEnd - lunchStart
      let lunchTimeMin = getLunchTimeMin(goalWorkTime)
      if (lunchTime < lunchTimeMin) {
        lunchTime = lunchTimeMin
      }
      let calcTime = lunchStart - morning
      let calcLeaveTime = lunchStart + lunchTime + goalWorkTime - calcTime
      setLeaveTime(calcLeaveTime)
    } else {
      setLeaveTime(0)
    }
  }

  useEffect(() => {
    setMorning(getLocalStorageNumber('morning'))
    setLunchStart(getLocalStorageNumber('lunchStart'))
    setLunchEnd(getLocalStorageNumber('lunchEnd'))
    setgoalWorkTime(getLocalStorageNumber('endOfWork'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    showLeaveTime()
    localStorage.setItem('morning', morning.toString())
    localStorage.setItem('lunchStart', lunchStart.toString())
    localStorage.setItem('lunchEnd', lunchEnd.toString())
    localStorage.setItem('goalWorkTime', goalWorkTime.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [morning, lunchStart, lunchEnd, goalWorkTime])

  return (
    <div className='lg:space-y-10 divide-y-[1px]'>
      <div className='grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none'>
        <div className='flex flex-col space-y-5 basis-1/2'>
          <TimeInput time={morning} setTime={setMorning} name='Morning' />
          <TimeInput
            time={lunchStart}
            setTime={setLunchStart}
            name='Lunch start'
          />
          <div>
            <TimeInput time={lunchEnd} setTime={setLunchEnd} name='Lunch end' />
          </div>
          <div>
            <TimeInput
              time={goalWorkTime}
              setTime={setgoalWorkTime}
              name='Goal work time'
              color='blue'
              bold
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center font-semibold basis-1/2'>
          <p className='text-purple-500 text-3xl'>Time to leave</p>
          <p className='text-pink-500 text-7xl'>{msToString(leaveTime)}</p>
        </div>
      </div>
      <div className='flex flex-row justify-center'>
        <button
          className='bg-amber-400 rounded-sm p-2 px-3 mt-5'
          onClick={clearTimes}
        >
          <span className='font-semibold text-xl'>Reset</span>
        </button>
      </div>
    </div>
  )
}

export default LeaveCalculator
