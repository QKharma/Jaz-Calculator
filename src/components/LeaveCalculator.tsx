import { useEffect, useState } from 'react'
import msToString from '../lib/msToString'
import TimeInput from './TimeInput'

const LeaveCalculator = () => {
  const [morning, setMorning] = useState(0)
  const [lunchStart, setLunchStart] = useState(0)
  const [lunchEnd, setLunchEnd] = useState(0)
  const [goalWorkTime, setgoalWorkTime] = useState(0)
  const [leaveTime, setLeaveTime] = useState('00:00')
  const [lunchTime, setLunchTime] = useState(0)
  const [lunchTimeMin, setLunchTimeMin] = useState(0)

  const clearTimes = () => {
    setMorning(0)
    setLunchStart(0)
    setLunchEnd(0)
    setgoalWorkTime(0)
  }

  useEffect(() => {
    loadTimes(setMorning, setLunchStart, setLunchEnd, setgoalWorkTime)
  }, [])

  useEffect(() => {
    if (
      morning !== 0 &&
      lunchStart !== 0 &&
      lunchEnd !== 0 &&
      goalWorkTime !== 0
    ) {
      let calcLunchTime = lunchEnd - lunchStart
      let calcLunchTimeMin = 0
      if (goalWorkTime <= 18000000) {
        setLunchTimeMin(0)
        calcLunchTimeMin = 0
      } else if (goalWorkTime > 18000000 && goalWorkTime < 32400000) {
        setLunchTimeMin(1800000)
        calcLunchTimeMin = 1800000
      } else {
        setLunchTimeMin(3600000)
        calcLunchTimeMin = 3600000
      }
      if (calcLunchTime < calcLunchTimeMin) {
        calcLunchTime = calcLunchTimeMin
      }
      let calcTime = lunchStart - morning
      let calcLeaveTime = lunchStart + calcLunchTime + goalWorkTime - calcTime
      console.log(calcLunchTime, calcLunchTimeMin)
      setLunchTime(calcLunchTime)
      setLeaveTime(msToString(calcLeaveTime))
    } else {
      setLeaveTime('00:00')
    }
  }, [morning, lunchStart, lunchEnd, goalWorkTime])

  useEffect(() => {
    if (morning !== 0) {
      localStorage.setItem('morning', morning.toString())
    }
    if (lunchStart !== 0) {
      localStorage.setItem('lunchStart', lunchStart.toString())
    }
    if (lunchEnd !== 0) {
      localStorage.setItem('lunchEnd', lunchEnd.toString())
    }
    if (goalWorkTime !== 0) {
      localStorage.setItem('goalWorkTime', goalWorkTime.toString())
    }
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
          <div className='divide-y-[1px]'>
            <div className='pb-2.5'>
              <TimeInput
                time={lunchEnd}
                setTime={setLunchEnd}
                name='Lunch end'
              />
            </div>
            <div className='pt-2.5'>
              <TimeInput
                time={goalWorkTime}
                setTime={setgoalWorkTime}
                name='Goal work time'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center font-semibold basis-1/2'>
          <p className='text-pink-500 text-7xl'>{leaveTime}</p>
        </div>
      </div>
      <div className='flex flex-row justify-center'>
        <button
          className='bg-amber-400 rounded-sm p-1 mt-5'
          onClick={clearTimes}
        >
          <span className='font-semibold'>Reset</span>
        </button>
      </div>
    </div>
  )
}

const loadTimes = (
  setMorning: (i: number) => void,
  setLunchStart: (i: number) => void,
  setLunchEnd: (i: number) => void,
  setgoalWorkTime: (i: number) => void
) => {
  let morning = window.localStorage.getItem('morning')
  let lunchStart = window.localStorage.getItem('lunchStart')
  let lunchEnd = window.localStorage.getItem('lunchEnd')
  let goalWorkTime = window.localStorage.getItem('goalWorkTime')

  if (morning) {
    setMorning(parseInt(morning))
  }
  if (lunchStart) {
    setLunchStart(parseInt(lunchStart))
  }
  if (lunchEnd) {
    setLunchEnd(parseInt(lunchEnd))
  }
  if (goalWorkTime) {
    setgoalWorkTime(parseInt(goalWorkTime))
  }
}

export default LeaveCalculator
