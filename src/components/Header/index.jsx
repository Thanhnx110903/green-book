import classNames from 'classnames/bind'
import styles from './Header.module.css'

const cx = classNames.bind(styles)

export default function Header() {
  return (
    <header>
      <div className={cx('container')}>
        <div className='d-flex justify-between items-center py-[20px]'>
          <img src='/src/assets/imgs/logo.png' alt='' />
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
                <span className='text-[14px] font-bold'>0968.715.858</span>
              </div>
            </div>
            <div className='d-flex items-center'>
              <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/user.png' alt='' />
              <div>
                <p className='text-[14px] text-[#000000]'>Tài khoản</p>
                <a href='!#' className='text-[11px] text-[#000000]'>
                  Đăng nhập
                </a>
              </div>
            </div>
            <div className={cx('d-flex items-center', 'header-cart')}>
              <img src='/src/assets/imgs/cart.png' alt='' className='w-[24px] h-[24px]' />
              <p className='text-[1.4rem] text-[#000000] mx-[8px]'>Giỏ hàng</p>
              <span className={cx('count-item')}>0</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
