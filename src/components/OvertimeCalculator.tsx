import { useEffect, useState } from 'react'
import getLocalStorageNumber from '../lib/getLocalStorageNumber'
import getLunchTimeMin from '../lib/getLunchTimeMin'
import msToString from '../lib/msToString'
import TimeInput from './TimeInput'

const OvertimeCalculator = () => {
  const [morning, setMorning] = useState(0)
  const [lunchStart, setLunchStart] = useState(0)
  const [lunchEnd, setLunchEnd] = useState(0)
  const [endOfWork, setEndOfWork] = useState(0)
  const [workTime, setWorkTime] = useState(0)
  const [overtime, setOvertime] = useState(0)
  const [lunchTime, setLunchTime] = useState(0)

  const clearTimes = () => {
    setMorning(0)
    setLunchStart(0)
    setLunchEnd(0)
    setEndOfWork(0)
    setLunchTime(0)
    setWorkTime(0)
    setOvertime(0)
  }

  const showOvertime = () => {
    if (
      morning !== 0 &&
      lunchStart !== 0 &&
      lunchEnd !== 0 &&
      endOfWork !== 0
    ) {
      let workTime = lunchStart - morning + endOfWork - lunchEnd
      let lunchTime = lunchEnd - lunchStart
      let lunchTimeMin = getLunchTimeMin(workTime)
      if (lunchTime < lunchTimeMin) {
        lunchTime = lunchTimeMin
      }
      workTime = endOfWork - morning - lunchTime
      let calcOvertime = workTime - 28800000
      setLunchTime(lunchTime)
      setWorkTime(workTime)
      setOvertime(calcOvertime)
    } else {
      setOvertime(0)
    }
  }

  useEffect(() => {
    setMorning(getLocalStorageNumber('morning'))
    setLunchStart(getLocalStorageNumber('lunchStart'))
    setLunchEnd(getLocalStorageNumber('lunchEnd'))
    setEndOfWork(getLocalStorageNumber('endOfWork'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    showOvertime()
    localStorage.setItem('morning', morning.toString())
    localStorage.setItem('lunchStart', lunchStart.toString())
    localStorage.setItem('lunchEnd', lunchEnd.toString())
    localStorage.setItem('endOfWork', endOfWork.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [morning, lunchStart, lunchEnd, endOfWork])

  return (
    <div className='space-y-10 w-100'>
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
              <p className='pl-12 text-violet-500 text-3xl space-x-6'>
                <span>Work</span> <span>Lunch</span>
              </p>
              <p className='pl-10 text-violet-500 text-3xl space-x-8'>
                <span>{msToString(workTime)}</span>
                <span>{msToString(lunchTime)}</span>
              </p>
            </div>
            <p className='text-pink-500 text-7xl'>
              {overtime >= 0 ? '+' : '-'}
              {msToString(overtime)}
            </p>
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
    </div>
  )
}

export default OvertimeCalculator
