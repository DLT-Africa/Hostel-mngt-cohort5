import React, {useState} from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const HeaderSideNav = ({items, setNavToggle}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const handleClick = (index) => {
        setActiveIndex(index)
    }

  return (
    <aside>
        <div className='--flex-end --sidebar-close'>
            <IoCloseOutline className='sidebar-toggle-icon' onClick={() => setNavToggle(false)}/>
        </div>

        <div className='left'>
            {items.map(({title, url}, index) => (
                <div className='--flex-center dir-column' key={index}>
                    <Link to={url} className={index === activeIndex ? 'active-link': ""} onClick={() => handleClick(index)}>
                    {title}
                    </Link>

                </div>
            ))}

            <div className='--flex-start --flex-center'>
                <button className='btn-primary'>New</button>
            </div>
        </div>
    </aside>
  )
}

export default HeaderSideNav
