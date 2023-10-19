'use client'

import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const cx = classNames.bind(styles)

export default function Header() {
  return (
    <>
      <header className={cx('header-search-sticky', 'shadow-lg')}>
        <div>
          <div className={cx('container-wrap')}>
            <div className={cx('d-flex justify-between items-center pt-[14px] pb-[8px]')}>
              <Link to='/'>
                <img src='/src/assets/imgs/logo.png' alt='' />
              </Link>
              <div>
                <div className='relative'>
                  <input type='text' placeholder='Tìm kiếm sản phẩm...' className={cx('header-input')} />
                  <i className={cx('fa-solid fa-magnifying-glass w-[57px] rounded-r-[99px]', 'icon')}></i>
                </div>
                <ul className='d-flex mt-[8px]'>
                  <li className='mr-[8px]'>
                    <a href='!#' className='text-[1.2rem] text-[#6c757d]'>
                      Sách
                    </a>
                  </li>
                  <li className='mr-[8px]'>
                    <a href='!#' className='text-[1.2rem] text-[#6c757d]'>
                      Đồ chơi
                    </a>
                  </li>
                  <li className='mr-[8px]'>
                    <a href='!#' className='text-[1.2rem] text-[#6c757d]'>
                      Quà tặng
                    </a>
                  </li>
                  <li className='mr-[8px]'>
                    <a href='!#' className='text-[1.2rem] text-[#6c757d]'>
                      Vpp
                    </a>
                  </li>
                </ul>
              </div>
              <div className='d-flex items-center gap-[16px]'>
                <div className='d-flex items-center'>
                  <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/hotline.png' alt='' />
                  <div>
                    <p className='text-[14px] text-[#000000]'>Hỗ trợ khách hàng</p>
                    <Link to='!#' className='text-[14px] font-bold hover:text-primary'>
                      0968.715.858
                    </Link>
                  </div>
                </div>
                <div className='d-flex items-center'>
                  <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/user.png' alt='' />
                  <div>
                    <Link to='!#' className='text-[14px] text-[#000000] hover:text-primary block'>
                      Tài khoản
                    </Link>
                    <Link to='/login' className='text-[11px] text-[#000000] hover:text-primary'>
                      Đăng nhập
                    </Link>
                  </div>
                </div>
                <Link to='/cart' className={cx('d-flex items-center', 'header-cart')}>
                  <img src='/src/assets/imgs/cart.png' alt='' className='w-[24px] h-[24px]' />
                  <p className='text-[1.4rem] text-[#000000] mx-[8px]'>Giỏ hàng</p>
                  <span className={cx('count-item')}>0</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={cx('bg-primary pt-[10px]')}>
        <div className={cx('container-wrap')}>
          <div className={cx('d-flex h-[48px]')}>
            <div className={cx('d-flex items-center')}>
              <div className={cx('category-wrap', 'mr-[26px]')}>
                <div className={cx('category-icon')}>
                  <span className={cx('category__span')}></span>
                  <span className={cx('category__span-short')}></span>
                  <span className={cx('category__span')}></span>
                </div>
                <div className={cx('header-category')}>Danh mục sản phẩm</div>
              </div>
              <img src='/src/assets/imgs/insure.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='/polyci' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Chính sách đổi trả
              </Link>
            </div>
            <div className={cx('d-flex items-center')}>
              <img src='/src/assets/imgs/logcation.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='!#' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Hệ thống cửa hàng
              </Link>
            </div>
            <div className={cx('d-flex items-center')}>
              <img src='/src/assets/imgs/order.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='!#' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Kiểm tra đơn hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
