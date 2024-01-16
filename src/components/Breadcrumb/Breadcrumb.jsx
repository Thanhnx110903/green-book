import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
const Breadcrumb = ({ params = [], className, currenParam }) => {
  // const breadcrumbs = useBreadcrumbs()
  return (
    <div className=' p-4 bg-[#f6f6f6]'>
      <div className='container-wrap'>
        <ul className='flex m-0'>
          {params?.length &&
            params?.map((item, index) => {
              console.log(index)
              return (
                <li key={index} className='m-0'>
                  <Link to={item?.href} className={`${currenParam != item?.label ? 'text-[#999] ' : 'uppercase'}`}>
                    <span className=''>{item?.label}</span>
                    {index != params.length - 1 && <span className='px-2'>/</span>}
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default memo(Breadcrumb)
