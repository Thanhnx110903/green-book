import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
const Breadcrumb = ({ params = [], className, currenParam }) => {
  // const breadcrumbs = useBreadcrumbs()
  return (
    <div className='w-full p-4 bg-[#f6f6f6]'>
      <ul className='flex m-0'>
        {params?.length &&
          params?.map((item, index) => {
            return (
              <li className='m-0'>
                <Link to={item?.href} className={`${currenParam != item?.label ? 'text-[#999] ' : 'uppercase'}`}>
                  <span className=''>{item?.label}</span>
                  {index != params.length - 1 && <span className='px-2'>/</span>}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default memo(Breadcrumb)