import React, { memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
const Button = ({ type, name, handleonClick, style, iconsBefore, iconsAfter, isLoading }) => {
  return (
    <button
      type={type || 'button'}
      className={
        style
          ? style
          : ' text-3xl h-[45px] flex w-full justify-center items-center rounded-[999px] bg-[#fbd947] px-3 py-1.5 font-normal leading-6 text-[#bb141a] shadow-sm hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      }
      onClick={() => {
        handleonClick && handleonClick()
      }}
    >
      {isLoading ? <LoadingOutlined /> : name}
    </button>
  )
}

export default memo(Button)
