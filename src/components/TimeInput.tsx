import React, { useEffect } from 'react'
import msToString from '../lib/msToString'

interface TimeInputProps {
  name: string
  setTime: (s: number) => void
  time: number
}

const TimeInput = (props: TimeInputProps) => {
  return (
    <div className='flex flex-row justify-end lg:mr-20'>
      <div className='text-white mr-10 whitespace-nowrap'>{props.name}</div>
      <input
        className='appearance-none bg-white rounded-sm py-1 px-8 min-w-max'
        type={'time'}
        onChange={(e) => {
          props.setTime(e.target.valueAsNumber)
        }}
        value={msToString(props.time)}
      ></input>
    </div>
  )
}

export default TimeInput
