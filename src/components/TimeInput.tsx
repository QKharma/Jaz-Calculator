import React from 'react'

interface TimeInputProps {
  name: string
}

const TimeInput = (props: TimeInputProps) => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='text-white mr-4'>{props.name}</div>
      <input
        className='appearance-none bg-white rounded-lg p-1'
        type={'time'}
      ></input>
    </div>
  )
}

export default TimeInput
