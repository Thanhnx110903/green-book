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
  const { data, isLoading } = useGetCategoriesQuery()
  const [hoveredItem, setHoveredItem] = useState(null)
  return (
    <div className={cx('container-wrap')}>
      <div className={cx('d-flex justify-between h-[415px] border rounded-sm')}>
        <div className={cx('w-[258px] h-full')}>
          <nav className='relative h-full'>
            {isLoading ? (
              <div className='mt-5 w-full'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <ul>
                {data?.data?.slice(0, 5)?.map((item) => {
                  return (
                    <li
                      key={item?.id}
                      className={cx('d-flex items-center justify-between ')}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Link
                        className={cx(
                          'w-[100%] py-[10px] px-[14px] d-flex items-center justify-between hover:text-primary'
                        )}
                        to='#'
                      >
                        <div className={cx('d-flex items-center')}>
                          <img src='/src/assets/imgs/menu_icon_1.png' alt='' />
                          <p className={cx('ml-[6px] text-[1.5rem]')}>{item?.name}</p>
                        </div>
                        <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem] ml-[7px]')}></i>
                      </Link>

                      {hoveredItem && hoveredItem.id === item.id && (
                        <div className='absolute w-[340%] left-[100%] h-full bg-white z-50 top-0 border rounded-sm p-5'>
                          <ul className='grid grid-cols-4'>
                            {item?.children !== null &&
                              Object.values(item?.children)?.map((child) => (
                                <li key={child?.id}>
                                  <Link to={`/${child?.slug}`} className='font-bold'>
                                    {child?.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </nav>
        </div>

        <div className={cx('flex-1 h-[100%] pt-[15px]', '')}>
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
