import { useState } from 'react'

const LunchInfo = () => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className='flex flex-col w-full'>
      <button
        className='bg-black bg-opacity-20 text-white'
        onClick={() => setShowInfo(!showInfo)}
      >
        Show lunch info{' '}
      </button>
      <div
        className={`${
          showInfo ? '' : 'hidden '
        }text-white bg-black bg-opacity-10 text-center`}
      >
        <p>Required lunch times</p>
        <p>Less than 5 hours Worktime -{'>'} 0h lunch</p>
        <p>5 to 8 hours Worktime -{'>'} 0.5h lunch</p>
        <p>More than 9 hours Worktime -{'>'} 1h lunch</p>
      </div>
    </div>
  )
}

export default LunchInfo
