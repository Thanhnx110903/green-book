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
    <div className='max-w-[1400px]  mx-auto'>
      <div className='flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 lg:max-h-[400px] lg:grid-rows-2 w-full h-full border rounded-sm gap-4'>
        <div className={cx('hidden lg:block h-full lg:col-span-1 lg:row-span-2')}>
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
                      className={cx(' flex items-center justify-between ')}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Link
                        className={cx(
                          'w-[100%] py-[10px] px-[14px]  d-flex items-center justify-between hover:text-primary'
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
                        <div className='absolute w-[340%] lg:left-[100%] left-0 h-full bg-white z-50 top-0 border rounded-sm p-5'>
                          <ul className='grid md:grid-cols-4 grid-cols-1'>
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
{/* <div className='flex justify-between'>
  
</div> */}
        <div className={cx('w-full md:col-span-2 lg:col-span-3 row-span-2 h-[100%]', '')}>
          <Carousel>
            <img className={cx('w-[100%] h-[100%] object-cover')} alt='...' src='/src/assets/imgs/slider-01.webp' />
            <img className={cx('w-[100%] h-[100%] object-cover')} alt='...' src='/src/assets/imgs/slider-02.webp' />
          </Carousel>
        </div>
        <img className={cx('w-[100%] h-[370px] md:h-full object-cover col-span-1 row-span-1')} src='/src/assets/imgs/banner-01.webp' alt='' />
            <img className={cx('w-[100%] h-[370px] md:h-full  object-cover col-span-1 row-span-1')} src='/src/assets/imgs/banner-02.webp' alt='' />
        {/* <div className={cx('w-[258px] pt-[15px] hidden lg:block')}>
          <div className={cx('d-flex flex-col gap-[15px]')}>
            
          </div>
        </div> */}
      </div>
    </div>
  )
}
