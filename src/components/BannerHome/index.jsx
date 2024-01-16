// eslint-disable-next-line import/named
import { Carousel } from 'flowbite-react'
import classNames from 'classnames/bind'

import styles from './BannerHome.module.css'

const cx = classNames.bind(styles)
export default function BannerHome() {
  return (
    <div className={cx('container-wrap pt-[15px]')}>
      <div className={cx('grid  md:grid-cols-4 grid-cols-2 grid-rows-2 md:grid-rows-2 gap-4')}>
        <div className={cx('w-[100%] h-[100%]  col-span-3 row-span-1  md:row-span-2', '')}>
          <Carousel>
            <img className={cx('w-[100%] h-[100%]  object-cover')} alt='...' src='/src/assets/imgs/slider_1.png' />
            <img className={cx('w-[100%] h-[100%]  object-cover')} alt='...' src='/src/assets/imgs/slider_2.png' />
          </Carousel>
        </div>
        <img
          className={cx('w-[100%] col-span-1 row-span-1 object-cover')}
          src='/src/assets/imgs/banner-01.webp '
          alt=''
        />
        <img
          className={cx('w-[100%] col-span-1 row-span-1 object-cover')}
          src='/src/assets/imgs/banner-02.webp'
          alt=''
        />
      </div>
    </div>
  )
}
