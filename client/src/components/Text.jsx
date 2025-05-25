import React from 'react'

const Text = ({title, subTitle}) => {
  return (
    <div>
      <h1 className='font-semibold text-gray-700 text-2xl'>{title}</h1>
      <p className='text-sm text-gray-400'>{subTitle}</p>
    </div>
  )
}

export default Text
