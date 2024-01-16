'use client'

import classNames from 'classnames/bind'
import styles from './Header.module.css'
import { LuTicket } from 'react-icons/lu'
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
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react'
const cx = classNames.bind(styles)

export default function Header() {
  const { data: dataCate, isLoading: isLoadingCate } = useGetCategoriesQuery()
  const [data, setData] = useState([])
  const [dataSearch, setDataSearch] = useState(null)
  const [cookies, setCookie] = useCookies(['userInfor'])
  const { data: dataCart, isLoading, refetch } = useGetCartQuery()
  const { data: dataBook, isLoading: isLoadingData } = useGetBooksQuery()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [navbar, setNavbar] = useState(false)
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

  console.log(dataSearch)
  useEffect(() => {
    refetch()
  }, [cookies?.userInfor])

  useEffect(() => {
    if (dataBook?.data?.data) {
      setData(dataBook?.data?.data)
    }
  }, [isLoadingData, dataBook])

  console.log(dataBook)
  return (
    <>
      <header className={cx('header-search-sticky', 'shadow-lg')}>
        <div className={cx('')}>
          <div>
            <div className={cx('container-wrap ')}>
              <div className={cx('d-flex justify-between  items-center pt-[10px] pb-[4px] lg:pt-[14px] lg:pb-[8px]')}>
                <div class='block lg:hidden'>
                  {/* Thanh menu */}

                  <div className={`${navbar && 'bg-black/80 fixed w-full h-screen  top-0 left-0 z-40'}`}></div>
                  <nav
                    className={` lg:w-full  shadow ${
                      navbar ? 'bg-black fixed top-0 left-0 z-[50] h-screen w-[45%] md:w-[35%]' : 'block'
                    }`}
                  >
                    <div
                      className={`${
                        navbar && 'bg-black cursor-auto'
                      } w-full cursor-pointer shadow-none justify-between px-4 mx-auto lg:max-w-7xl lg:items-center lg:flex lg:px-8`}
                    >
                      <div>
                        <div className=' flex items-center justify-between py-3 lg:py-5 lg:block'>
                          <a href='javascript:void(0)'>
                            <h2 className={`text-2xl font-bold text-white ${!navbar && 'hidden'}`}>
                              <Link to='/'>
                                <img src='/src/assets/imgs/logo.png' alt='' className='w-[100px]' />
                              </Link>
                            </h2>
                          </a>
                          <div className='lg:hidden cursor-pointer'>
                            <div
                              className='p-2 text-gray-700 rounded-md outline-none  focus:border'
                              onClick={() => setNavbar(!navbar)}
                            >
                              {navbar ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='w-6 h-6 text-white'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              ) : (
                                <div className='outline-none'>
                                  <span className={cx('category__span')}></span>
                                  <span className={cx('category__span-short')}></span>
                                  <span className={cx('category__span')}></span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
                            navbar ? 'block' : 'hidden'
                          }`}
                        >
                          <ul className='items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0'>
                            <li className='flex items-center text-white hover:text-indigo-200'>
                              <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/user.png' alt='' />
                              <div>
                                {cookies && cookies?.userInfor?.access_token ? (
                                  <div>
                                    <Link to='/profile' className='text-[14px] text-white hover:text-indigo-200'>
                                      Tài khoản
                                    </Link>
                                  </div>
                                ) : (
                                  <div>
                                    <Link to='/Login' className='text-white hover:text-indigo-200 '>
                                      Tài khoản
                                    </Link>
                                  </div>
                                )}

                                {cookies && cookies?.userInfor?.access_token ? (
                                  <div>
                                    <div
                                      onClick={handleLogout}
                                      className='text-[11px] cursor-pointer text-white hover:text-indigo-200'
                                    >
                                      Đăng xuất
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <Link to='/login' className='text-white hover:text-indigo-200 '>
                                      Đăng nhập
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </li>
                            <li className='text-white hover:text-indigo-200'>
                              <div className='flex items-center '>
                                <img
                                  className='w-[32px] h-[32px] mr-[16px]'
                                  src='/src/assets/imgs/hotline.png'
                                  alt=''
                                />
                                <div>
                                  <p className='text-white hover:text-indigo-200'>Hỗ trợ khách hàng</p>
                                  <Link to='tel:0968.715.858' className='text-[14px] font-bold hover:text-primary'>
                                    0968.715.858
                                  </Link>
                                </div>
                              </div>
                            </li>
                            <li className='text-white hover:text-indigo-200'>
                              <div className='flex items-center '>
                                <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/insure.png' alt='' />
                                <div>
                                  <Link to='/polyci' className='text-white hover:text-indigo-200'>
                                    Chính sách đổi trả
                                  </Link>
                                </div>
                              </div>
                            </li>
                            <li className='text-white hover:text-indigo-200'>
                              <div className='flex items-center '>
                                <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs//order.png' alt='' />
                                <div>
                                  <Link to='/voucher' className='text-white hover:text-indigo-200'>
                                    Mã giảm giá
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='hidden space-x-2 lg:inline-block'>
                        <a
                          href='javascript:void(0)'
                          className='px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'
                        >
                          Sign in
                        </a>
                        <a
                          href='javascript:void(0)'
                          className='px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
                        >
                          Sign up
                        </a>
                      </div>
                    </div>
                  </nav>
                  {/* Thanh menu */}
                </div>
                <Link to='/'>
                  <img src='/src/assets/imgs/logo.png' alt='' className='w-[170px]' />
                </Link>
                <div className='w-[30%]  hidden lg:flex md:mr-30 lg:mr-1 '>
                  <div className='w-full'>
                    <div className='relative w-full'>
                      <input
                        type='text'
                        onChange={onchangeSearch}
                        placeholder='Tìm kiếm sản phẩm...'
                        className={cx('header-input')}
                      />
                      <i className={cx('fa-solid fa-magnifying-glass w-[57px] rounded-r-[99px]', 'icon')}></i>
                      <div className='absolute w-full top-[120%] bg-white shadow-lg flex flex-col gap-3 max-h-[500px] overflow-y-auto'>
                        {dataSearch?.length
                          ? dataSearch?.map((item) => {
                              return (
                                <div key={item?.id} className='flex gap-3'>
                                  <Link to={`/product/${item?.id}`} onClick={() => setDataSearch([])}>
                                    <img src={item.image} alt='' className='w-[70px] h-[70px] object-cover  ' />
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
                <div className='lg:flex  items-center gap-[16px]  text-[1.4rem] text-[#000000]'>
                  <div className='d-flex lg:flex items-center hidden'>
                    <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/hotline.png' alt='' />
                    <div>
                      <p className='text-[14px] text-[#000000]'>Hỗ trợ khách hàng</p>
                      <Link to='!#' className='text-[14px] font-bold hover:text-primary'>
                        0968.715.858
                      </Link>
                    </div>
                  </div>
                  <div className='d-flex items-center lg:flex hidden'>
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
                  <Link to='/cart' className={cx('d-flex items-center', 'header-cart')}>
                    <img src='/src/assets/imgs/cart.png' alt='' className='w-[24px] h-[24px]' />
                    <p className='text-[1.4rem] text-[#000000] mx-[8px]  hidden lg:block'>Giỏ hàng</p>
                    <span className={cx('count-item')}>
                      {isLoading ? <span className='text-[9px]'>loading...</span> : dataCart?.data?.length || 0}
                    </span>
                  </Link>
                </div>
              </div>
              <div className='lg:hidden w-full md:mr-30 lg:mr-1 pb-10'>
                <div className=''>
                  <div className='relative w-full'>
                    <input
                      type='text'
                      onChange={onchangeSearch}
                      placeholder='Tìm kiếm sản phẩm...'
                      className={cx('header-input')}
                    />
                    <i className={cx('fa-solid fa-magnifying-glass w-[57px] rounded-r-[99px]', 'icon')}></i>
                    <div className='absolute w-full top-[120%] bg-white shadow-lg flex flex-col gap-3 max-h-[500px] overflow-y-auto'>
                      {dataSearch?.length
                        ? dataSearch?.map((item) => {
                            return (
                              <div key={item?.id} className='flex gap-3'>
                                <Link to={`/product/${item?.id}`} onClick={() => setDataSearch([])}>
                                  <img src={item.image} alt='' className='w-[70px] h-[70px] object-cover  ' />
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
            </div>
          </div>
        </div>
      </header>

      <div className={cx('pt-[10px] hidden lg:block', 'bg')}>
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
                            {Object.values(dataCate?.data)
                              ?.slice(0, 5)
                              ?.map((item) => {
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
            </div>
            <div className={cx('d-flex items-center')}>
              <img src='/src/assets/imgs/insure.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='/polyci' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Chính sách đổi trả
              </Link>
            </div>
            <div className={cx('d-flex items-center')}>
              <LuTicket className={cx(' mr-[10px] text-[#fff] text-[2.2rem]')} />
              <Link to='/voucher' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Mã giảm giá
              </Link>
            </div>
            <div className={cx('d-flex items-center')}>
              <img src='/src/assets/imgs/order.png' className={cx('w-[32px] h-[32px] mr-[10px]')} alt='' />
              <Link to='/search-order' className={cx('text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]')}>
                Kiểm tra đơn hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
