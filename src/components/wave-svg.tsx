import React from 'react'

const SvgWave = () => {
  return (
    <div className='w-full h-[100px] overflow-hidden absolute -bottom-10'>
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
        <path d="M-0.27,38.98 C154.34,153.47 349.20,-49.98 499.72,79.45 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#ffffff' }}></path>
      </svg>
    </div>
  )
}

export default SvgWave