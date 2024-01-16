import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { RiArrowDownSFill } from 'react-icons/ri'
const cx = classNames.bind(styles)

export default function Footer() {
  return (
    <>
      <footer  className='container-wrap'>
        <div className={cx('container-wrap')}>
        <div className={cx('w-full flex lg:flex-row flex-col justify-between px-10')}>
            <div className={cx('w-full lg:max-w-[30.5%]')}>
              <Link to='/'>
                <img src='/src/assets/imgs/logo.png' alt='' className='w-[170px]' />
              </Link>
              <p className={cx('my-[16px] text-[1.5rem] leading-normal')}>
                Nhà Sách GreenBook nhận đặt hàng trực tuyến và giao hàng tận nơi hoặc nhận hàng tại tất cả Hệ Thống Nhà
                Sách GreenBook trên toàn quốc.
              </p>
              <div>
                <div className={cx('d-flex items-center mb-[10px]')}>
                  <i className={cx('fa-solid fa-location-dot', 'mr-[14px]')}></i>
                  <p className={cx('text-[1.5rem]')}>Địa chỉ: Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</p>
                </div>
                <div className={cx('d-flex items-center mb-[10px]')}>
                  <i className={cx('fa-solid fa-mobile-screen-button', 'mr-[14px]')}></i>
                  <p className={cx('text-[1.5rem]')}>Số điện thoại: 0968.715.858</p>
                </div>
                <div className={cx('d-flex items-center mb-[10px]')}>
                  <i className={cx('fa-solid fa-envelope', 'mr-[14px]')}></i>
                  <p className={cx('text-[1.5rem]')}>Email: greenbook@gmail.com</p>
                </div>
                <div className={cx('d-flex items-center gap-[16px] mt-[22px]')}>
                  <img src='/src/assets/icons/facebook.svg' alt='' />
                  <img src='/src/assets/icons/zalo.svg' alt='' />
                  <img src='/src/assets/icons/instagram.svg' alt='' />
                </div>
              </div>
            </div>
            <div className={cx('w-full lg:max-w-[68%] mt-8')}>
              <div className='d-flex lg:flex-row flex-col gap-5 md:gap-8 justify-between'>
                <div className='lg:block  items-center justify-between hidden'>
                  <h3 className={cx('footer-title', 'mt-4')}>DỊCH VỤ</h3>
                  <RiArrowDownSFill className='text-4xl lg:hidden'/>
                  <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block hidden')}>
                    <li className='mb-[10px]'>Điều khoản sử dụng</li>
                    <li className='mb-[10px]'>Chính sách bảo mật</li>
                    <li className='mb-[10px]'>Giới thiệu</li>
                    <li>Hệ thống trung tâm - nhà sách</li>
                  </ul>
                </div>

               
                <div className='lg:hidden'>
                  <div id='bouton' className='relative group/bouton w-full'>
                    <button className=' relative flex justify-between  w-full'>
                      <h3 className={cx('footer-title', 'mt-4')}>DỊCH VỤ</h3>
                      <span className='absolute flex items-center justify-center  w-12 top-0 h-full right-0'>
                        <RiArrowDownSFill className='text-4xl lg:hidden group-hover/bouton:rotate-180' />
                      </span>
                    </button>
                    <div className='z-50 absolute w-full top-full bg-stone-50 origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all'>
                      <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block')}>
                        <li>Điều khoản sử dụng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Giới thiệu</li>
                        <li>Hệ thống trung tâm - nhà sách</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='lg:block  items-center justify-between hidden'>
                  <h3 className={cx('footer-title', 'mt-4')}>HỖ TRỢ</h3>
                  <RiArrowDownSFill className='text-4xl lg:hidden' />
                  <ul className={cx(' lg:mt-[17px] lg:text-[1.5rem] lg:block hidden')}>
                    <li className='mb-[10px]'>Chính sách đổi - trả - hoàn tiền</li>
                    <li className='mb-[10px]'>Chính sách khách sỉ</li>
                    <li className='mb-[10px]'>Phương thức vận chuyển</li>
                    <li>Phương thức thanh toán và xuất HĐ</li>
                  </ul>
                </div>

             
                <div className='lg:hidden'>
                  <div id='bouton' className='relative group/bouton w-full'>
                    <button className=' relative flex justify-between  w-full'>
                      <h3 className={cx('footer-title', 'mt-4')}>HỖ TRỢ</h3>
                      <span className='absolute flex items-center justify-center  w-12 top-0 h-full right-0'>
                        <RiArrowDownSFill className='text-4xl lg:hidden group-hover/bouton:rotate-180' />
                      </span>
                    </button>
                    <div className='z-50 absolute w-full  top-full bg-stone-50 origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all'>
                      <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block')}>
                        <li>Chính sách đổi - trả - hoàn tiền</li>
                        <li>Chính sách khách sỉ</li>
                        <li>Phương thức vận chuyển</li>
                        <li>Phương thức thanh toán và xuất HĐ</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='lg:block  items-center justify-between hidden'>
                  <h3 className={cx('footer-title', 'mt-4')}>TÀI KHOẢN CỦA TÔI</h3>
                  <RiArrowDownSFill className='text-4xl lg:hidden' />
                  <ul className={cx(' lg:mt-[17px] lg:text-[1.5rem] lg:block hidden')}>
                    <li className='mb-[10px]'>Đăng nhập/Tạo mới tài khoản</li>
                    <li className='mb-[10px]'>Thay đổi địa chỉ khách hàng</li>
                    <li className='mb-[10px]'>Chi tiết tài khoản</li>
                    <li className='mb-[10px]'>Lịch sử mua hàng</li>
                  </ul>
                </div>

              
                <div className='lg:hidden'>
                  <div id='bouton' className='relative group/bouton w-full'>
                    <button className=' relative flex justify-between  w-full'>
                      <h3 className={cx('footer-title', 'mt-4')}>TÀI KHOẢN CỦA TÔI</h3>
                      <span className='absolute flex items-center justify-center  w-12 top-0 h-full right-0'>
                        <RiArrowDownSFill className='text-4xl lg:hidden group-hover/bouton:rotate-180' />
                      </span>
                    </button>
                    <div className='absolute w-full  top-full bg-stone-50 origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all'>
                      <ul className={cx(' lg:mt-[17px] lg:text-[1.8rem] lg:block')}>
                        <li>Đăng nhập/Tạo mới tài khoản</li>
                        <li>Thay đổi địa chỉ khách hàng</li>
                        <li>Chi tiết tài khoản</li>
                        <li>Lịch sử mua hàng</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full'>
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
                <div className='w-full'>
                  <div className={cx('w-full d-flex items-center justify-between mb-[16px]')}>
                    <div>
                      <img src='/src/assets/imgs/footer-1.png' className='object-cover  ' alt='' />
                    </div>
                    <div>
                      <img src='/src/assets/imgs/footer-2.png' className='object-cover  ' alt='' />
                    </div>
                    <div>
                      <img src='/src/assets/imgs/footer-3.png' className='object-cover  ' alt='' />
                    </div>
                    <div>
                      <img src='/src/assets/imgs/footer-4.png' className='object-cover  ' alt='' />
                    </div>
                  </div>
                  <div className={cx('d-flex items-center justify-between')}>
                    <div>
                      <img src='/src/assets/imgs/footer-5.png' className='object-cover  w-[50px] lg:w-[100px]' alt='' />
                    </div>
                    <div>
                      <img src='/src/assets/imgs/footer-6.png' className='object-cover  w-[50px] lg:w-[100px]' alt='' />
                    </div>
                    <div>
                      <img
                        src='/src/assets/imgs/footer-7.png'
                        className='object-cover w-[50px]   lg:w-[100px]'
                        alt=''
                      />
                    </div>
                    <div>
                      <img src='/src/assets/imgs/footer-8.png' className='object-cover  w-[50px] lg:w-[100px]' alt='' />
                    </div>
                    <div className=''>
                      <img src='/src/assets/imgs/footer-9.png' className='object-cover w-[50px]  lg:w-[100px]' alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('bg-[#efefef] py-[10px]')}>
          <div className={cx('container-wrap', 'text-[14px]')}>
            © Bản quyền thuộc về Nhà sách GreenBook | Cung cấp bởi Sapo
          </div>
        </div>
      </footer>
    </>
  )
}
