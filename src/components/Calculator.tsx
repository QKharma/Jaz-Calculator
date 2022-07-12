import { useEffect, useState } from 'react'
import msToString from '../lib/msToString'
import TimeInput from './TimeInput'

const Calculator = () => {
  const [morning, setMorning] = useState(0)
  const [lunchStart, setLunchStart] = useState(0)
  const [lunchEnd, setLunchEnd] = useState(0)
  const [endOfWork, setEndOfWork] = useState(0)
  const [overtime, setOvertime] = useState('00:00')
  const [overtimeSign, setOvertimeSign] = useState<'+' | '-'>('+')

  useEffect(() => {
    let calcOvertime = lunchStart - morning + (endOfWork - lunchEnd) - 28800000
    if (calcOvertime >= 0) {
      setOvertimeSign('+')
    } else {
      setOvertimeSign('-')
    }
    setOvertime(msToString(calcOvertime))
  }, [morning, lunchStart, lunchEnd, endOfWork])

  return (
    <div className='grid lg:grid-cols-2 grid-rows-2 self-center'>
      <div className='flex flex-col space-y-5 basis-1/2'>
        <TimeInput time={morning} setTime={setMorning} name='Morning' />
        <TimeInput
          time={lunchStart}
          setTime={setLunchStart}
          name='Lunch start'
        />
        <TimeInput time={lunchEnd} setTime={setLunchEnd} name='Lunch end' />
        <TimeInput time={endOfWork} setTime={setEndOfWork} name='End of Work' />
      </div>
      <div className='grid place-items-center text-7xl font-semibold basis-1/2'>
        <p className='text-pink-500'>
          {overtimeSign}
          {overtime}
        </p>
      </div>
    </div>
  )
}

export default Calculator
