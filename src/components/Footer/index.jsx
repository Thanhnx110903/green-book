import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const cx = classNames.bind(styles)

export default function Footer() {
  return (
    <>
      <footer>
        <div className={cx('container-wrap')}>
          <div className={cx('wrapper')}>
            <div className={cx('footer-right')}>
              <Link to='/'>
              <img src='/src/assets/imgs/logo1.png' alt='' className='w-[170px]'/>

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
            <div className={cx('footer-left')}>
              {/* footer top */}
              <div className='d-flex justify-between'>
                <div className=''>
                  <h3 className={cx('footer-title')}>DỊCH VỤ</h3>
                  <ul className={cx('footer-list')}>
                    <li>Điều khoản sử dụng</li>
                    <li>Chính sách bảo mật</li>
                    <li>Giới thiệu</li>
                    <li>Hệ thống trung tâm - nhà sách</li>
                  </ul>
                </div>
                <div className=''>
                  <h3 className={cx('footer-title')}>HỖ TRỢ</h3>
                  <ul className={cx('footer-list')}>
                    <li>Chính sách đổi - trả - hoàn tiền</li>
                    <li>Chính sách khách sỉ</li>
                    <li>Phương thức vận chuyển</li>
                    <li>Phương thức thanh toán và xuất HĐ</li>
                  </ul>
                </div>
                <div className=''>
                  <h3 className={cx('footer-title')}>TÀI KHOẢN CỦA TÔI</h3>
                  <ul className={cx('footer-list')}>
                    <li>Đăng nhập/Tạo mới tài khoản</li>
                    <li>Thay đổi địa chỉ khách hàng</li>
                    <li>Chi tiết tài khoản</li>
                    <li>Lịch sử mua hàng</li>
                  </ul>
                </div>
              </div>
              {/* footer-bot */}
              <div>
                <div className={cx('mb-[16px]')}>
                  <h3 className={cx('footer-title', 'mt-[17px]')}>Liên hệ</h3>
                  <div className={cx('d-flex items-center mb-[5px]')}>
                    <i className={cx('fa-solid fa-building', 'mr-[4px]')}></i>
                    <p>GPKD số 0100778001 cấp ngày 23-11-1998 do SKHĐT Hà nội cấp</p>
                  </div>
                  <div className={cx('d-flex items-center')}>
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
                <div>
                  <div className={cx('d-flex items-center justify-between mb-[16px]')}>
                    <img src='/src/assets/imgs/footer-1.png' alt='' />
                    <img src='/src/assets/imgs/footer-2.png' alt='' />
                    <img src='/src/assets/imgs/footer-3.png' alt='' />
                    <img src='/src/assets/imgs/footer-4.png' alt='' />
                  </div>
                  <div className={cx('d-flex items-center justify-between')}>
                    <img src='/src/assets/imgs/footer-5.png' alt='' />
                    <img src='/src/assets/imgs/footer-6.png' alt='' />
                    <img className={cx('w-[60px] h-[60px]')} src='/src/assets/imgs/footer-7.png' alt='' />
                    <img className={cx('w-[130px] h-[60px]')} src='/src/assets/imgs/footer-8.png' alt='' />
                    <img className={cx('w-[60px] h-[60px]')} src='/src/assets/imgs/footer-9.png' alt='' />
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
