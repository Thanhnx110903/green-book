import React from 'react'
import classNames from 'classnames/bind'
import styles from './ProducstList.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'
const cx = classNames.bind(styles)
const Productslist = () => {
  const { books } = useSelector((state) => state.books)
  return (
    <ul className={cx('grid grid-cols-4 gap-[25px]')}>
      {/* Product item */}
      {books?.map((books) => (
        <ProductCard key={books.id} books={books} />
      ))}

      <li className={cx('product-item')}>
        <Link to='/product'>
          <img src='/src/assets/imgs/produc-01.webp' alt='' />
        </Link>
        <div className={cx('p-[10px]')}>
          <Link to='/product'>
            <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>Cậu Ma Nhà Xí Hanako - Tập 10</p>
          </Link>
          <div className={cx('d-flex items-center justify-between')}>
            <div className={cx('text-primary font-medium')}>
              28000 <span>đ</span>
            </div>
            <div
              className={cx(
                'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
              )}
            >
              <i className='fa-solid fa-plus'></i>
            </div>
          </div>
        </div>
      </li>
      <li className={cx('product-item')}>
        <Link to='/product'>
          <img src='/src/assets/imgs/produc-01.webp' alt='' />
        </Link>
        <div className={cx('p-[10px]')}>
          <Link to='/product'>
            <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>Cậu Ma Nhà Xí Hanako - Tập 10</p>
          </Link>
          <div className={cx('d-flex items-center justify-between')}>
            <div className={cx('text-primary font-medium')}>
              28000 <span>đ</span>
            </div>
            <div
              className={cx(
                'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
              )}
            >
              <i className='fa-solid fa-plus'></i>
            </div>
          </div>
        </div>
      </li>
      <li className={cx('product-item')}>
        <Link to='/product'>
          <img src='/src/assets/imgs/produc-01.webp' alt='' />
        </Link>
        <div className={cx('p-[10px]')}>
          <Link to='/product'>
            <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>Cậu Ma Nhà Xí Hanako - Tập 10</p>
          </Link>
          <div className={cx('d-flex items-center justify-between')}>
            <div className={cx('text-primary font-medium')}>
              28000 <span>đ</span>
            </div>
            <div
              className={cx(
                'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
              )}
            >
              <i className='fa-solid fa-plus'></i>
            </div>
          </div>
        </div>
      </li>
      <li className={cx('product-item')}>
        <Link to='/product'>
          <img src='/src/assets/imgs/produc-01.webp' alt='' />
        </Link>
        <div className={cx('p-[10px]')}>
          <Link to='/product'>
            <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>Cậu Ma Nhà Xí Hanako - Tập 10</p>
          </Link>
          <div className={cx('d-flex items-center justify-between')}>
            <div className={cx('text-primary font-medium')}>
              28000 <span>đ</span>
            </div>
            <div
              className={cx(
                'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
              )}
            >
              <i className='fa-solid fa-plus'></i>
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default Productslist
