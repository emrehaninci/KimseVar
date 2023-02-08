import React from 'react'

function Info({children, background}) {
  return (
    <div className='info-container' style={{backgroundColor:background, color: 'white'}}>
        {children}
    </div>
  )
}

export default Info
