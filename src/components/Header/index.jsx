'use client'

import classNames from 'classnames/bind'
import styles from './Header.module.css'
import { cookies as cookies2 } from '../../config/cookies'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { destroyCookie, parseCookies } from 'nookies'
import { useGetCartQuery } from '../../redux/api/cart'
import { useEffect, useState } from 'react'
import { useGetBooksQuery } from '../../redux/api/book'
import FormatPrice from '../../untils/formatPrice'
import { useGetCategoriesQuery } from '../../redux/api/category'
import PcLoading from '../PcLoading'
const cx = classNames.bind(styles)

export default function Header() {
  const { data: dataCate, isLoading: isLoadingCate } = useGetCategoriesQuery()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [data, setData] = useState([])
  const [dataSearch, setDataSearch] = useState(null)
  const cookies3 = parseCookies()
  const [cookies, setCookie] = useCookies(['userInfor'])
  const { data: dataCart, isLoading, refetch, error } = useGetCartQuery()
  const { data: dataBook, isLoading: isLoadingData } = useGetBooksQuery()
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogout = async () => {
    destroyCookie(null, 'userInfor')
    setCookie('userInfor', {})
    window.location.href = '/login'
  }
  const onchangeSearch = (e) => {
    if (e.target.value) {
      const dataQuery = data?.filter((item) => {
        return item?.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setDataSearch(dataQuery)
    } else {
      setDataSearch([])
    }
  }
  useEffect(() => {
    if (dataBook?.data?.data) {
      setData(dataBook?.data?.data)
    }
  }, [isLoadingData, dataBook])
  return (
    <>
      <header className={cx('header-search-sticky', 'shadow-lg')}>
        <div className={cx('')}>
          <div className={cx('container-wrap')}>
            <div className={cx('d-flex justify-between items-center pt-[14px] pb-[8px]')}>
              <Link to='/'>
                <img src='/src/assets/imgs/logo.png' alt='' className='w-[200px]' />
              </Link>
              <div className='mr-96 md:mr-30 lg:mr-1'>
                <div className='w-[100%] lg:w-[180%] sm:w-[150%]'>
                  <div className='relative w-full'>
                    <input
                      type='text'
                      onChange={onchangeSearch}
                      placeholder='Tìm kiếm sản phẩm...'
                      className={cx('header-input')}
                    />
                    <i className={cx('fa-solid fa-magnifying-glass w-[57px] rounded-r-[99px]', 'icon')}></i>
                    <div className=' absolute w-full top-[120%] bg-white shadow-lg flex flex-col max-h-[500px] overflow-y-auto'>
                      {dataSearch?.length
                        ? dataSearch?.map((item) => {
                            console.log(item)
                            return (
                              <div key={item?.id} className='flex gap-3 p-[7px] border-b-[1px]'>
                                <Link to={`/product/${item?.id}`} onClick={() => setDataSearch([])}>
                                  <img src={item?.image} alt='' className='w-[70px] h-[70px] object-cover' />
                                </Link>

                                <div className='my-1 flex-1'>
                                  <Link to={`/product/${item?.id}`} onClick={() => setDataSearch([])}>
                                    <p className='text-[14px] font-bold'>{item?.name}</p>
                                  </Link>
                                  <p className='text-[12px]'>
                                    <FormatPrice price={item?.price} />
                                  </p>
                                  <p className='text-[10px] max-w-[300px] truncate'>{item?.short_description}</p>
                                </div>
                              </div>
                            )
                          })
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
              <div class='block md:hidden'>
                <button class='flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white'>
                  <svg class='h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <title>Menu</title>
                    <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                  </svg>
                </button>
              </div>
              <div className='md:flex d-flex items-center gap-[16px]'>
                <div className='d-flex md:flex items-center hidden'>
                  <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/hotline.png' alt='' />
                  <div>
                    <p className='text-[14px] text-[#000000]'>Hỗ trợ khách hàng</p>
                    <Link to='tel:0968.715.858' className='text-[14px] font-bold hover:text-primary'>
                      0968.715.858
                    </Link>
                  </div>
                </div>
                <div className='d-flex items-center md:flex hidden'>
                  <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/user.png' alt='' />
                  {cookies && cookies?.userInfor?.access_token ? (
                    <div>
                      <Link to='/profile' className='text-[14px] text-[#000000] hover:text-primary block'>
                        Tài khoản
                      </Link>
                      <div
                        onClick={handleLogout}
                        className='text-[11px] cursor-pointer text-[#000000] hover:text-primary'
                      >
                        Đăng xuất
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Link to='/Login' className='text-[14px] text-[#000000] hover:text-primary block'>
                        Tài khoản
                      </Link>
                      <Link to='/login' className='text-[11px] text-[#000000] hover:text-primary'>
                        Đăng nhập
                      </Link>
                    </div>
                  )}
                </div>
                <Link to='/cart' className={cx('d-flex items-center md:flex hidden', 'header-cart')}>
                  <img src='/src/assets/imgs/cart.png' alt='' className='w-[24px] h-[24px]' />
                  <p className='text-[1.4rem] text-[#000000] mx-[8px]'>Giỏ hàng</p>
                  <span className={cx('count-item')}>
                    {isLoading ? <span className='text-[9px]'>loading...</span> : dataCart?.data?.length || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={cx('pt-[10px]', 'bg')}>
        <div className={cx('container-wrap')}>
          <div className={cx('d-flex h-[48px]')}>
            <div className={cx('d-flex items-center')}>
              <div className={cx('category-wrap', 'mr-[26px]')}>
                <div className={cx('category-icon')}>
                  <span className={cx('category__span')}></span>
                  <span className={cx('category__span-short')}></span>
                  <span className={cx('category__span')}></span>
                </div>
                <div>
                  <div className={cx('header-category')}>
                    <p>Danh mục sản phẩm</p>
                    <div className={cx('w-[258px] h-full absolute', 'list-cate')}>
                      <nav className='relative h-full'>
                        {isLoadingCate ? (
                          <div className='mt-5 w-full'>
                            {Array.from({ length: 3 }).map((_, index) => (
                              <PcLoading key={index} />
                            ))}
                          </div>
                        ) : (
                          <ul className='bg-[#fff] pb-[110px] rounded-b-[5px] shadow-lg'>
                            {dataCate?.data?.slice(0, 5)?.map((item) => {
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
                                      <p
                                        className={cx(
                                          'ml-[6px] text-[1.5rem] text-[#000000] hover:text-primary font-normal'
                                        )}
                                      >
                                        {item?.name}
                                      </p>
                                    </div>
                                    <i className={cx('fa-solid fa-chevron-right', 'text-[1.4rem] ml-[7px]')}></i>
                                  </Link>

                                  {hoveredItem && hoveredItem.id === item.id && (
                                    <div className='absolute w-[343%] left-[100%] h-full pb-[228px] shadow-lg bg-white z-50 top-0 border rounded-sm p-5'>
                                      <ul className='grid grid-cols-4'>
                                        {item?.children !== null &&
                                          Object.values(item?.children)?.map((child) => (
                                            <li key={child?.id}>
                                              <Link
                                                to={`/${child?.slug}`}
                                                className='text-[#000000] hover:text-primary font-normal'
                                              >
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
                  </div>
                </div>
              </div>
              <img src='/src/assets/imgs/insure.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='/polyci' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Chính sách đổi trả
              </Link>
            </div>
            <div className={cx('d-flex items-center')}>
              <img src='/src/assets/imgs//order.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='/voucher' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Mã giảm giá
              </Link>
            </div>
            {/* <div className={cx('d-flex items-center')}>
              <img src='/src/assets/imgs/order.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='!#' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Kiểm tra đơn hàng
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
