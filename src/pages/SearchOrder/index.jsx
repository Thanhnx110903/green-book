import React from 'react'

import SearchDetailOrder from './components/SearchDetailOrder'
import { Link } from 'react-router-dom'

export default function SeachOrder() {
  return (
    <>
      <div className='bg-[#f6f6f6] py-[6px]'>
        <div className='container-wrap text-[1.4rem]'>
          <Link className='text-[#999]' to='/'>
            Trang chủ /
          </Link>
          <span> Tìm kiếm đơn hàng</span>
        </div>
      </div>
      <div className='bg-[#f5f5f5]'>
        <div className='w-full py-[60px] bg-bgr'>
          <div className='px-[50px] bg-bgr max-w-[1200px] rounded-xl flex flex-col mx-auto'>
            <div className='mb-6'>
              <div
                className='hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block'
                id='tabs-home'
                role='tabpanel'
                aria-labelledby='tabs-home-tab'
                data-te-tab-active
              >
                <SearchDetailOrder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
