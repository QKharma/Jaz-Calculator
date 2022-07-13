import React from 'react'
import msToString from '../lib/msToString'

interface TimeInputProps {
  name: string
  setTime: (s: number) => void
  time: number
}

const TimeInput = (props: TimeInputProps) => {
  const resetInput = (e: React.KeyboardEvent) => {
    e.preventDefault()
    props.setTime(0)
  }

  return (
    <div className='flex flex-row justify-end lg:mr-20'>
      <p className='text-white mr-10 whitespace-nowrap'>{props.name}</p>
      <input
        className='appearance-none bg-white rounded-sm py-1 px-8 min-w-max'
        type={'time'}
        onChange={(e) => {
          props.setTime(e.target.valueAsNumber)
        }}
        onKeyDown={(e) => e.key === 'Delete' && resetInput(e)}
        value={msToString(props.time)}
        required
      ></input>
    </div>
  )
}

export default TimeInput
