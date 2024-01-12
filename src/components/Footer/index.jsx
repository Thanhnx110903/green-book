import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { RiArrowDownSFill } from 'react-icons/ri'

const cx = classNames.bind(styles)

export default function Footer() {
  return (
    <>
      <footer>
        <div className={cx('container-wrap')}>
          <div className={cx('w-full flex lg:flex-row flex-col justify-between px-10')}>
            <div className={cx('w-full lg:max-w-[30.5%]')}>
              <Link to='/'>
                <img src='/src/assets/imgs/logo.png' alt='' className='w-[170px]' />
              </Link>
              <p className={cx('my-[16px] text-[1.5rem] leading-normal')}>
                Nhà Sách Tiền Phong nhận đặt hàng trực tuyến và giao hàng tận nơi hoặc nhận hàng tại tất cả Hệ Thống Nhà
                Sách Tiền Phong trên toàn quốc.
              </p>
              <div>
                <div className={cx('d-flex items-center mb-[10px]')}>
                  <i className={cx('fa-solid fa-location-dot', 'mr-[14px]')}></i>
                  <p className={cx('text-[1.5rem]')}>Địa chỉ: Tầng 5, Tòa nhà Tiền phong, 15 Hồ Xuân Hương, Hà Nội</p>
                </div>
                <div className={cx('d-flex items-center mb-[10px]')}>
                  <i className={cx('fa-solid fa-mobile-screen-button', 'mr-[14px]')}></i>
                  <p className={cx('text-[1.5rem]')}>Số điện thoại: 0968.715.858</p>
                </div>
                <div className={cx('d-flex items-center mb-[10px]')}>
                  <i className={cx('fa-solid fa-envelope', 'mr-[14px]')}></i>
                  <p className={cx('text-[1.5rem]')}>Email: info@grennbookjsc.com</p>
                </div>
                <div className={cx('d-flex items-center gap-[16px] mt-[22px]')}>
                  <img src='/src/assets/icons/facebook.svg' alt='' />
                  <img src='/src/assets/icons/zalo.svg' alt='' />
                  <img src='/src/assets/icons/instagram.svg' alt='' />
                </div>
              </div>
            </div>
            <div className={cx('w-full lg:max-w-[68%]')}>
              <div className='d-flex lg:flex-row flex-col justify-between'>
                <div className='lg:block flex items-center justify-between'>
                  <h3 className={cx('footer-title', 'mt-4')}>DỊCH VỤ</h3>
                  <RiArrowDownSFill className='text-4xl lg:hidden'/>
                  <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block hidden')}>
                    <li>Điều khoản sử dụng</li>
                    <li>Chính sách bảo mật</li>
                    <li>Giới thiệu</li>
                    <li>Hệ thống trung tâm - nhà sách</li>
                  </ul>
                </div>
                <div className='lg:block flex items-center justify-between'>
                  <h3 className={cx('footer-title', 'mt-4')}>HỖ TRỢ</h3>
                  <RiArrowDownSFill className='text-4xl lg:hidden'/>
                  <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block hidden')}>
                    <li>Chính sách đổi - trả - hoàn tiền</li>
                    <li>Chính sách khách sỉ</li>
                    <li>Phương thức vận chuyển</li>
                    <li>Phương thức thanh toán và xuất HĐ</li>
                  </ul>
                </div>
                <div className='lg:block flex items-center justify-between'>
                  <h3 className={cx('footer-title', 'mt-4')}>TÀI KHOẢN CỦA TÔI</h3>
                  <RiArrowDownSFill className='text-4xl lg:hidden'/>
                  <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block hidden')}>
                    <li>Đăng nhập/Tạo mới tài khoản</li>
                    <li>Thay đổi địa chỉ khách hàng</li>
                    <li>Chi tiết tài khoản</li>
                    <li>Lịch sử mua hàng</li>
                  </ul>
                </div>
              </div>
              {/* footer-bot */}
              <div className='w-full'>
                <div className={cx('mb-[16px]')}>
                  <h3 className={cx('footer-title', 'mt-[17px]')}>Liên hệ</h3>
                  <div className={cx('d-flex items-center mb-[5px]')}>
                    <i className={cx('fa-solid fa-building', 'mr-[4px]')}></i>
                    <p>GPKD số 0100778001 cấp ngày 23-11-1998 do SKHĐT Hà nội cấp</p>
                  </div>
                  <div className={cx('flex lg:flex-row flex-col gap-1 lg:items-center')}>
                    <div className={cx('d-flex items-center mr-[50px]')}>
                      <i className={cx('fa-solid fa-location-pin', 'mr-[4px]')}></i>
                      <p>Tầng 5, Tòa nhà Tiền phong, 15 Hồ Xuân Hương, Hà Nội</p>
                    </div>
                    <div className={cx('d-flex items-center')}>
                      <i className={cx('fa-solid fa-phone', 'mr-[4px]')}></i>
                      <p> 0968.715.858</p>
                    </div>
                  </div>
                </div>
                {/* Pay */}
                <div className='w-full'>
                  <div className={cx('d-flex items-center justify-between mb-[16px]')}>
                    <img src='/src/assets/imgs/footer-1.png' className='object-cover  w-[100px]' alt='' />
                    <img src='/src/assets/imgs/footer-2.png' className='object-cover w-[100px]' alt='' />
                    <img src='/src/assets/imgs/footer-3.png' className='object-cover ' alt='' />
                    <img src='/src/assets/imgs/footer-4.png' className='object-cover ' alt='' />
                  </div>
                  <div className={cx('d-flex items-center justify-between')}>
                    <img src='/src/assets/imgs/footer-5.png' className=' w-[100px]' alt='' />
                    <img src='/src/assets/imgs/footer-6.png' className=' w-[100px]' alt='' />
                    <img className={cx('lg:w-[60px] h-[60px]  w-[60px]')} src='/src/assets/imgs/footer-7.png' alt='' />
                    <img className={cx('lg:w-[130px] h-[60px]  w-[80px]')} src='/src/assets/imgs/footer-8.png' alt='' />
                    <img className={cx('lg:w-[60px] h-[60px]  w-[60px]')} src='/src/assets/imgs/footer-9.png' alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('bg-[#efefef] py-[10px]')}>
          <div className={cx('container-wrap', 'text-[14px]')}>
            © Bản quyền thuộc về Nhà sách Tiền Phong | Cung cấp bởi Sapo
          </div>
        </div>
      </footer>
    </>
  )
}
