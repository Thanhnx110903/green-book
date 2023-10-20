// eslint-disable-next-line import/named
import { Carousel } from 'flowbite-react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './BannerHome.module.css'

const cx = classNames.bind(styles)

export default function BannerHome() {
  return (
    <div className={cx('container-wrap')}>
      <div className={cx('d-flex justify-between h-[415px]')}>
        <div className={cx('w-[258px]')}>
          <nav>
            <ul>
              <li className={cx('d-flex items-center justify-between ')}>
                <Link
                  className={cx('w-[100%] py-[10px] px-[14px] d-flex items-center justify-between hover:text-primary')}
                  to='!#'
                >
                  <div className={cx('d-flex items-center')}>
                    <img src='/src/assets/imgs/menu_icon_1.png' alt='' />
                    <p className={cx('ml-[6px] text-[1.5rem]')}>Sách tiếng Việt</p>
                  </div>
                  <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem] ml-[7px]')}></i>
                </Link>
              </li>
              <li className={cx('')}>
                <Link
                  className={cx('w-[100%] py-[10px] px-[14px] d-flex items-center justify-between hover:text-primary')}
                  to='!#'
                >
                  <div className={cx('d-flex items-center')}>
                    <img src='/src/assets/imgs/menu_icon_2.png' alt='' />
                    <p className={cx('text-[1.5rem] ml-[6px] w-[150px]')}>Sách giáo khoa - tham khảo</p>
                  </div>
                  <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem]')}></i>
                </Link>
              </li>
              <li className={cx('d-flex items-center justify-between ')}>
                <Link
                  className={cx('w-[100%] py-[10px] px-[14px] d-flex items-center justify-between hover:text-primary')}
                  to='!#'
                >
                  <div className={cx('d-flex items-center')}>
                    <img src='/src/assets/imgs/menu_icon_3.png' alt='' />
                    <p className={cx('ml-[6px]  text-[1.5rem]')}>Sách ngoại ngữ</p>
                  </div>
                  <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem]')}></i>
                </Link>
              </li>
              <li className={cx('d-flex items-center justify-between ')}>
                <Link
                  className={cx('w-[100%] py-[10px] px-[14px] d-flex items-center justify-between hover:text-primary')}
                  to='!#'
                >
                  <div className={cx('d-flex items-center')}>
                    <img src='/src/assets/imgs/menu_icon_4.png' alt='' />
                    <p className={cx('ml-[6px]  text-[1.5rem]')}>Dụng cụ học sinh</p>
                  </div>
                  <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem]')}></i>
                </Link>
              </li>
              <li className={cx('d-flex items-center justify-between ')}>
                <Link
                  className={cx('w-[100%] py-[10px] px-[14px] d-flex items-center justify-between hover:text-primary')}
                  to='!#'
                >
                  <div className={cx('d-flex items-center')}>
                    <img src='/src/assets/imgs/menu_icon_5.png' alt='' />
                    <p className={cx('ml-[6px] text-[1.5rem]')}>Văn phòng phẩm</p>
                  </div>
                  <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem]')}></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={cx('w-[854px] h-[100%] pt-[15px]')}>
          <Carousel>
            <img className={cx('w-[100%] h-[100%]')} alt='...' src='/src/assets/imgs/slider-01.webp' />
            <img className={cx('w-[100%] h-[100%]')} alt='...' src='/src/assets/imgs/slider-02.webp' />
          </Carousel>
        </div>

        <div className={cx('w-[258px] pt-[15px]')}>
          <div className={cx('d-flex flex-col gap-[15px]')}>
            <img className={cx('w-[100%] ')} src='/src/assets/imgs/banner-01.webp' alt='' />
            <img className={cx('w-[100%]')} src='/src/assets/imgs/banner-02.webp' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}
