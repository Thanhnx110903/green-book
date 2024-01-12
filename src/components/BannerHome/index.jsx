// eslint-disable-next-line import/named
import { Carousel } from 'flowbite-react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './BannerHome.module.css'
import { useGetCategoriesQuery } from '../../redux/api/category'
import { useState } from 'react'
import PcLoading from '../PcLoading'
const cx = classNames.bind(styles)
export default function BannerHome() {
  const { data: dataCate, isLoading: isLoadingCate } = useGetCategoriesQuery()
  const [hoveredItem, setHoveredItem] = useState(null)
  console.log(dataCate)
  return (
    <div className={cx('container-wrap pt-[15px]')}>
      <div className={cx('d-flex justify-between h-[470px] rounded-sm')}>
        <div className={cx('w-[100%] h-[100%] pr-[15px]', '')}>
          <Carousel>
            <img className={cx('w-[100%] h-[100%] object-cover')} alt='...' src='/src/assets/imgs/slider_1.png' />
            <img className={cx('w-[100%] h-[100%] object-cover')} alt='...' src='/src/assets/imgs/slider_2.png' />
          </Carousel>
        </div>

        <div className={cx('')}>
          <div className={cx('d-flex flex-col gap-[15px]')}>
            <img className={cx('')} src='/src/assets/imgs/banner-01.webp' alt='' />
            <img className={cx('')} src='/src/assets/imgs/banner-02.webp' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}
