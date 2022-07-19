import { Clock, ClockAfternoon } from 'phosphor-react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarButtonProps {
  icon: keyof typeof icons
  name: string
  path: string
}

const icons = {
  clock: <Clock size={48} color='#ec4899' />,
  clock2: <ClockAfternoon size={48} color='#ec4899' />,
}

const NavbarButton = (props: NavbarButtonProps) => {
  const location = useLocation()

  return (
    <div className='flex flex-row justify-between w-[310px]'>
      <Link
        to={props.path}
        className='hover:bg-pink-100 hover:bg-opacity-10 rounded-xl flex flex-row grow'
      >
        {icons[props.icon]}
        <div className='grid place-items-center px-2'>
          <p className='text-pink-500 text-2xl align-text-middle'>
            {props.name}
          </p>
        </div>
      </Link>

      <div
        className={`${
          location.pathname === props.path ? '' : 'hidden'
        }bg-pink-500 rounded-xl w-2 ml-1`}
      ></div>
    </div>
  )
}

export default NavbarButton
