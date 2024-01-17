import classNames from 'classnames/bind'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetBookByQueryQuery } from '../../redux/api/book'
import PcLoading from '../PcLoading'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProducstList.module.css'
const cx = classNames.bind(styles)
const Productslist = ({ id = null, sort_date = null, min = 0, max = 10, linkTo = '/', isButton = true }) => {
  const { data, isLoading } = useGetBookByQueryQuery({
    category_id: id,
    sort_date: sort_date
  })

  return (
    <>
      {isLoading ? (
        <div className='mt-5 w-full'>
          {Array.from({ length: 5 }).map((_, index) => (
            <PcLoading key={index} />
          ))}
        </div>
      ) : (
        <>
          <ul className={cx('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[25px]')}>
            {data?.data?.data?.slice(min, max).map((books) => (
              <ProductCard key={books.id} books={books} />
            ))}
          </ul>
          {isButton ? (
            <Link to={linkTo} className={cx('action-news', 'd-flex items-center justify-center')}>
              <p>Xem tất cả</p>
              <i className={cx('fa-solid fa-chevron-right', 'text-[1.1rem] mt-[3px] ml-[6px]')}></i>
            </Link>
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default Productslist
