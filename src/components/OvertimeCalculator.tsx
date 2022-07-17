import { useEffect, useState } from 'react'
import msToString from '../lib/msToString'
import TimeInput from './TimeInput'

const OvertimeCalculator = () => {
  const [morning, setMorning] = useState(0)
  const [lunchStart, setLunchStart] = useState(0)
  const [lunchEnd, setLunchEnd] = useState(0)
  const [endOfWork, setEndOfWork] = useState(0)
  const [workTime, setWorkTime] = useState(0)
  const [overtime, setOvertime] = useState('00:00')
  const [overtimeSign, setOvertimeSign] = useState<'+' | '-'>('+')
  const [lunchTime, setLunchTime] = useState(0)
  const [lunchTimeMin, setLunchTimeMin] = useState(0)

  const clearTimes = () => {
    setMorning(0)
    setLunchStart(0)
    setLunchEnd(0)
    setEndOfWork(0)
  }

  useEffect(() => {
    loadTimes(setMorning, setLunchStart, setLunchEnd, setEndOfWork)
  }, [])

  useEffect(() => {
    if (
      morning !== 0 &&
      lunchStart !== 0 &&
      lunchEnd !== 0 &&
      endOfWork !== 0
    ) {
      let calcTime = lunchStart - morning + endOfWork - lunchEnd
      let calcOvertime = calcTime - 28800000
      let lunchTime = lunchEnd - lunchStart
      let calcLunchTimeMin = 0
      if (calcTime <= 18000000) {
        setLunchTimeMin(0)
        calcLunchTimeMin = 0
      } else if (calcTime > 18000000 && calcTime < 32400000) {
        setLunchTimeMin(1800000)
        calcLunchTimeMin = 1800000
      } else {
        setLunchTimeMin(3600000)
        calcLunchTimeMin = 3600000
      }
      if (calcOvertime >= 0) {
        setOvertimeSign('+')
      } else {
        setOvertimeSign('-')
      }
      if (lunchTime < calcLunchTimeMin) {
        calcOvertime -= calcLunchTimeMin - lunchTime
      }
      if (lunchTime < calcLunchTimeMin) {
        lunchTime = calcLunchTimeMin
      }
      setLunchTime(lunchTime)
      setWorkTime(calcTime)
      setOvertime(msToString(calcOvertime))
    } else {
      setOvertimeSign('+')
      setOvertime('00:00')
    }
  }, [morning, lunchStart, lunchEnd, endOfWork])

  useEffect(() => {
    saveTimes(morning, lunchStart, lunchEnd, endOfWork)
  }, [morning, lunchStart, lunchEnd, endOfWork])

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
          <TimeInput time={lunchEnd} setTime={setLunchEnd} name='Lunch end' />
          <TimeInput
            time={endOfWork}
            setTime={setEndOfWork}
            name='End of Work'
          />
        </div>
        <div className='flex flex-col items-center justify-center font-semibold basis-1/2'>
          <div className='flex flex-col items-center'>
            <p className='pl-12 text-violet-500 text-3xl space-x-5'>
              <span>Work</span> <span>Lunch</span>
            </p>
            <p className='pl-10 text-violet-500 text-3xl space-x-8'>
              <span>{msToString(workTime)}</span>
              <span>{msToString(lunchTime)}</span>
            </p>
          </div>
          <p className='text-pink-500 text-7xl'>
            {overtimeSign}
            {overtime}
          </p>
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
  setEndOfWork: (i: number) => void
) => {
  let morning = window.localStorage.getItem('morning')
  let lunchStart = window.localStorage.getItem('lunchStart')
  let lunchEnd = window.localStorage.getItem('lunchEnd')
  let endOfWork = window.localStorage.getItem('endOfWork')

  if (morning) {
    setMorning(parseInt(morning))
  }
  if (lunchStart) {
    setLunchStart(parseInt(lunchStart))
  }
  if (lunchEnd) {
    setLunchEnd(parseInt(lunchEnd))
  }
  if (endOfWork) {
    setEndOfWork(parseInt(endOfWork))
  }
}

const saveTimes = (
  morning: number,
  lunchStart: number,
  lunchEnd: number,
  endOfWork: number
) => {
  if (morning !== 0) {
    localStorage.setItem('morning', morning.toString())
  }
  if (lunchStart !== 0) {
    localStorage.setItem('lunchStart', lunchStart.toString())
  }
  if (lunchEnd !== 0) {
    localStorage.setItem('lunchEnd', lunchEnd.toString())
  }
  if (endOfWork !== 0) {
    localStorage.setItem('endOfWork', endOfWork.toString())
  }
}
export default OvertimeCalculator
