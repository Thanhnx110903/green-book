import React, { memo } from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
const Breadcrumb = () => {
  // const breadcrumbs = useBreadcrumbs()
  console.log('hihi')
  return (
    <div className='w-full p-4 bg-[#f6f6f6]'>
      <ul className='flex m-0'>
        <li className='m-0'>
          <a href='!#' className='text-[#999]'>
            <span className=''>Trang chủ</span>
            <span className='px-2'>/</span>
          </a>
        </li>
        <li className='m-0'>
          <a href='!#' className='text-[#999]'>
            <span>Truyện tranh </span> <span className='px-2'>/</span>
          </a>
        </li>
        <li className='m-0'>
          <span>Dr.STONE - Tập 3: Nơi Nào Đó Sau 2 Triệu Năm</span>
        </li>
      </ul>
    </div>
  )
}

export default memo(Breadcrumb)
