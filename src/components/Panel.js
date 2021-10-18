import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ArrowLeftCircle, ArrowRightCircle, X } from 'react-feather'

export const useURLSearchParams = () => {
  return new URLSearchParams(useLocation().search);
}

const Panel = ({ name='table-of-contents', width, height, children, left=false, color='white' }) => {
  const [isOpen, setIsOpen ] = useState(false)
  const history = useHistory()
  const qs = useURLSearchParams()

  useEffect(() => {
    console.info('location changed:', qs.get('panel'));
    const panelName = qs.get('panel')
    setIsOpen(panelName === name)
  }, [qs, name])

  return (
    <div className="Panel" dataname={name} style={{
      width, height,
      backgroundColor: 'var(--dark)',
      position: 'fixed',
      zIndex:1002,
      transition: 'transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)',
      transform: `translateX(${isOpen ? 0 : (left ? 100 : -100)}%)`,
    }}>
      <button className={`Panel_closeButton absolute pa3 bg-transparent bw0 ${left ? 'right-0': 'left-0'}`} onClick={() => history.replace({ search: null, hash: window.location.hash })}>
        {left ? <ArrowRightCircle strokeWidth={1} size={25} color={color}/> : <ArrowLeftCircle strokeWidth={1} size={25} color={color}/> }
      </button>
      <button className={`Panel_closeButton absolute pa3 bg-transparent bw0 ${left ? 'left-0': 'right-0'}`} onClick={() => history.replace({ search: null, hash: window.location.hash })}>
        <X size={25} color={color}/>
      </button>
      {children}
    </div>
  )
}
export default Panel
