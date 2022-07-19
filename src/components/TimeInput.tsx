import React from 'react'
import msToString from '../lib/msToString'

const colors = {
  emerald: 'bg-emerald-300',
  blue: 'bg-blue-300',
}

interface TimeInputProps {
  name: string
  setTime: (s: number) => void
  time: number
  color?: keyof typeof colors
  bold?: boolean
}

const TimeInput = ({
  color = 'emerald',
  bold = false,
  ...props
}: TimeInputProps) => {
  const resetInput = (e: React.KeyboardEvent) => {
    e.preventDefault()
    props.setTime(0)
  }

  return (
    <div className='flex flex-row justify-end lg:mr-20'>
      <p
        className={`${
          bold ? 'font-bold' : ''
        } text-white mr-10 whitespace-nowrap`}
      >
        <span className='leading-none align-text-bottom'>{props.name}</span>
      </p>
      <input
        className={`appearance-none ${colors[color]} rounded-sm py-1 px-8 min-w-max`}
        type={'time'}
        onChange={(e) => {
          props.setTime(e.target.valueAsNumber)
        }}
        onKeyDown={(e) =>
          (e.key === 'Delete' || e.key === 'Backspace') && resetInput(e)
        }
        value={msToString(props.time)}
        required
      ></input>
    </div>
  )
}

export default TimeInput
