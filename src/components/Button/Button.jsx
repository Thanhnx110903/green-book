import React, { memo } from 'react'

const Button = ({ className, type, children, ...rest }) => {
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  )
}

export default memo(Button)
