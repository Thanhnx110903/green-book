'use client'

import classNames from 'classnames/bind'
import { IoCloseSharp } from 'react-icons/io5'
import { destroyCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { LuTicket } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useGetBooksQuery } from '../../redux/api/book'
import { useGetCartQuery, useRemoveCartMutation } from '../../redux/api/cart'
import { useGetCategoriesQuery } from '../../redux/api/category'
import FormatPrice from '../../untils/formatPrice'
import PcLoading from '../PcLoading'
import { message } from 'antd'
import styles from './Header.module.css'
const cx = classNames.bind(styles)

export default function Header() {
  const { data: dataCate, isLoading: isLoadingCate } = useGetCategoriesQuery()
  const [data, setData] = useState([])
  const [dataSearch, setDataSearch] = useState(null)
  const [cookies, setCookie] = useCookies(['userInfor'])
  const { data: dataCart, isLoading, refetch } = useGetCartQuery()
  const [removeItem, { isLoading: loadingRemoveAItem }] = useRemoveCartMutation()
  const { data: dataBook, isLoading: isLoadingData } = useGetBooksQuery()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [total, setTotal] = useState(0)
  const handleLogout = async () => {
    destroyCookie(null, 'userInfor')
    setCookie('userInfor', {})
    message.success('Đăng xuất thành công')
    setTimeout(() => {
      window.location.href = '/login'
    }, 500)
  }
  const handleRemoveItem = (id) => {
    removeItem(id)
      .unwrap()
      .then((item) => {
        message.success(item?.message)
      })
      .catch((err) => {
        console.log(err)
      })
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
    refetch()
  }, [cookies?.userInfor])

  useEffect(() => {
    if (dataBook?.data?.data) {
      setData(dataBook?.data?.data)
    }
  }, [isLoadingData, dataBook])
  useEffect(() => {
    if (dataCart?.data && dataCart.data !== data) {
      const total = dataCart.data.reduce((acc, item) => {
        const price = item?.quantity > 20 ? item.warehouse.wholesale_price : item.warehouse.retail_price
        return acc + item?.quantity * price
      }, 0)
      setTotal(total)
    }
  }, [isLoading, dataCart?.data, refetch, data])
  return (
    <>
      <header className={cx('header-search-sticky', 'shadow-lg')}>
        <div>
          <div className={cx('container-wrap')}>
            <div className={cx('d-flex justify-between items-center pt-[14px] pb-[8px]')}>
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
                    <div className='absolute w-full top-[120%] bg-white shadow-lg flex flex-col max-h-[500px] overflow-y-auto'>
                      {dataSearch?.length
                        ? dataSearch?.map((item) => {
                            return (
                              <div key={item?.id} className='flex gap-3 p-[10px] border-b-[1px] border-[#ccc]'>
                                <Link to={`/product/${item?.id}`} onClick={() => setDataSearch([])}>
                                  <img src={item.image} alt='' className='w-[70px] h-[70px] object-contain  ' />
                                </Link>

                                <div className='my-1 flex-1'>
                                  <Link to={`/product/${item?.id}`} onClick={() => setDataSearch([])}>
                                    <p className='text-[14px] font-bold'>{item?.name}</p>
                                  </Link>
                                  <p className='text-[12px]'>
                                    <FormatPrice price={item?.warehouse?.retail_price} />
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
              <div className='d-flex items-center gap-[16px]'>
                <div className='d-flex items-center'>
                  <img className='w-[32px] h-[32px] mr-[16px]' src='/src/assets/imgs/hotline.png' alt='' />
                  <div>
                    <p className='text-[14px] text-[#000000]'>Hỗ trợ khách hàng</p>
                    <Link to='!#' className='text-[14px] font-bold hover:text-primary'>
                      0968.715.858
                    </Link>
                  </div>
                </div>
                <div className='d-flex items-center'>
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
                <div className='relative group'>
                  <Link to='/cart' className={cx('d-flex items-center', 'header-cart')}>
                    <img src='/src/assets/imgs/cart.png' alt='' className='w-[24px] h-[24px]' />
                    <p className='text-[1.4rem] text-[#000000] mx-[8px]'>Giỏ hàng</p>
                    <span className={cx('count-item')}>
                      {isLoading ? <span className='text-[9px]'>loading...</span> : dataCart?.data?.length || 0}
                    </span>
                  </Link>

                  <div
                    className={cx(
                      'absolute hidden group-hover:block w-[400px] py-[18px] px-[10px] border-solid border-[1px] border-[#ccc] bg-[#ffffff] rounded-[4px] right-[0px] top-[50px] shadow-lg'
                    )}
                  >
                    {dataCart?.data?.length ? (
                      <>
                        <div>
                          <div className='flex flex-col gap-3 max-h-[300px] overflow-y-auto'>
                            {dataCart?.data?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className='d-flex items-start justify-between border-solid border-b-[1px] border-[#ccc] pb-[10px]'
                                >
                                  <div className='flex'>
                                    <Link to={`/book/${item?.book?.id}`} className='flex-shrink-0'>
                                      <img
                                        className=' w-[70px] h-[70px] object-contain'
                                        src={item?.book?.image}
                                        alt=''
                                      />
                                    </Link>
                                    <div>
                                      <Link to={`/book/${item?.book?.id}`}>
                                        <p className='text-[1.4] w-[260px] line-clamp-2'>{item?.book?.name}</p>
                                      </Link>
                                      <span className='text-primary text-[1.3rem] font-bold'>
                                        <FormatPrice
                                          price={
                                            item?.quantity > 20
                                              ? item?.warehouse?.wholesale_price
                                              : item?.warehouse?.retail_price
                                          }
                                        />
                                      </span>
                                      <span className='text-[1.3rem]'> x{item?.quantity}</span>
                                    </div>
                                  </div>
                                  <div className='cursor-pointer' onClick={() => handleRemoveItem(item?.id)}>
                                    <IoCloseSharp className='text-[20px]' />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className='d-flex items-center mb-4 mt-6'>
                            <span className='text-[14px] text-[#000000] mr-[2px]'>Tổng tiền tạm tính:</span>
                            <p className='text-primary font-bold d-flex items-center'>
                              <FormatPrice price={total} />
                            </p>
                          </div>
                        </div>
                        <Link to='/cart'>
                          <button className='bg-primary text-[#fff] w-[100%] py-[8px] text-[1.6rem] rounded-[4px]'>
                            Tiến hành thanh toán
                          </button>
                        </Link>
                      </>
                    ) : (
                      <span className='flex justify-center text-[14px]'>Không có sản phẩm nào.</span>
                    )}
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
