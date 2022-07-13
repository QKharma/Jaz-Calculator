import { Clock, ClockAfternoon } from 'phosphor-react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarButtonProps {
  icon: keyof typeof icons
  path: string
}

const icons = {
  clock: <Clock size={48} color='#ec4899' />,
  clock2: <ClockAfternoon size={48} color='#ec4899' />,
}

const NavbarButton = (props: NavbarButtonProps) => {
  const location = useLocation()

  return (
    <div className='flex flex-row'>
      <Link
        to={props.path}
        className='hover:bg-pink-100 hover:bg-opacity-10 rounded-xl'
      >
        {icons[props.icon]}
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
