import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './ListProducts.module.css'
import classNames from 'classnames/bind'
import { Link, useLocation, useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import SidebarCategory from '../../components/Sidebar/SidebarCategory'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'

const cx = classNames.bind(styles)
const ListProducts = () => {
  const { state } = useLocation()
  // console.log('h', state)
  const [showProductList, setShowProductList] = useState(null)
  const { category } = useParams()
  const { books } = useSelector((state) => state.books)
  const { categories } = useSelector((state) => state.categories)
  const allProductType = books.filter((item) => item.category_id == state)
  useEffect(() => {
    setShowProductList(allProductType)
  }, [state, category])
  const priceMax = () => {
    const reverseSortedProducts = allProductType.sort((a, b) => b.price - a.price)
    setShowProductList([...reverseSortedProducts])
  }
  const priceMin = () => {
    const sortedProducts = allProductType.sort((a, b) => a.price - b.price)
    setShowProductList([...sortedProducts])
  }
  const nameMax = () => {
    const reverseSortedProducts = allProductType.sort((a, b) => b.name > a.name)
    console.log(reverseSortedProducts);
    setShowProductList([...reverseSortedProducts])
  }
  const nameMin = () => {
    const sortedProducts = allProductType.sort((a, b) => a.name - b.name)
    setShowProductList([...sortedProducts])
  }
  const reset = () => {
    const resetList = allProductType
    setShowProductList([...resetList])
  }
  return (
    <div className=' '>
      {/* Home Products */}
      <Breadcrumb />
      <div className={cx('container-wrap')}>
        <div className='flex justify-center mt-8  '>
          <img src='https://bizweb.dktcdn.net/100/441/742/collections/m-qr.png?v=1656663743390' alt='' />
        </div>
        <div className={cx('d-flex justify-between mt-[60px]')}>
          <div className={cx('w-[258px]  p-[15px] mb-[30px]')}>
            <div className='bg-[#f5f5f5] p-8'>
              <h3 className={cx('font-bold  text-[1.6rem] mb-[24px]')}>DANH MỤC SẢN PHẨM</h3>
              <div className={cx('')}>
                <ul>
                  <SidebarCategory categories={categories} />

                  <li className={cx('text-[#616161] text-[1.6rem] pt-[10px]')}>
                    <Link to='!#'>Truyện tranh</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('mt-[40px]')}>
              <h4 className={cx('font-bold text-[1.6rem] mb-[24px]')}>MỨC GIÁ</h4>
              <ul>
                <li className={cx('d-flex items-center mb-[8px]')}>
                  <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                  <label htmlFor='#' className={cx('text-[1.4rem]')}>
                    Giá dưới 100.000đ
                  </label>
                </li>
                <li className={cx('d-flex items-center mb-[8px]')}>
                  <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                  <label htmlFor='#' className={cx('text-[1.4rem]')}>
                    100.000đ - 200.000đ
                  </label>
                </li>
                <li className={cx('d-flex items-center mb-[8px]')}>
                  <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                  <label htmlFor='#' className={cx('text-[1.4rem]')}>
                    200.000đ - 300.000đ
                  </label>
                </li>
                <li className={cx('d-flex items-center mb-[8px]')}>
                  <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                  <label htmlFor='#' className={cx('text-[1.4rem]')}>
                    300.000đ - 500.000đ
                  </label>
                </li>
                <li className={cx('d-flex items-center mb-[8px]')}>
                  <input type='checkbox' className={cx('checkbox', 'mr-[6px]')} />
                  <label htmlFor='#' className={cx('text-[1.4rem]')}>
                    Giá trên 500.000đ
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx('w-[1122px] ')}>
            <div>
              <h1 className='text-[31px] font-normal'>Sách tiếng việt</h1>
              <div className={cx('d-flex items-center border-b-[1px] border-solid border-[#dee2e6] mb-[10px]')}>
                <div className={cx('mr-[20px]')}>Sắp xếp: </div>
                <button
                  onClick={nameMax}
                  className={cx('p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2')}
                >
                  Tên A - Z
                </button>
                <button
                  onClick={nameMin}
                  className={cx('p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2')}
                >
                  Tên Z - A
                </button>
                <button
                  onClick={priceMin}
                  className={cx('p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2')}
                >
                  Giá tăng dần
                </button>
                <button
                  onClick={priceMax}
                  className={cx('p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2')}
                >
                  Giá giảm dần
                </button>
                <button
                  className={cx('p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2')}
                >
                  Hàng mới
                </button>
                <button
                  onClick={reset}
                  className={cx('p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2')}
                >
                  Reset
                </button>
              </div>
            </div>
            <div>
              {/* Product list */}
              <ul className={cx('grid grid-cols-4 gap-[25px]')}>
                {/* Product item */}
                <ProductCard books={showProductList} />

                <li className={cx('product-item')}>
                  <Link to='/product'>
                    <img src='/src/assets/imgs/produc-01.webp' alt='' />
                  </Link>
                  <div className={cx('p-[10px]')}>
                    <Link to='/product'>
                      <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                        Cậu Ma Nhà Xí Hanako - Tập 10
                      </p>
                    </Link>
                    <div className={cx('d-flex items-center justify-between')}>
                      <div className={cx('text-primary font-medium')}>
                        28000 <span>đ</span>
                      </div>
                      <div
                        className={cx(
                          'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                        )}
                      >
                        <i className='fa-solid fa-plus'></i>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={cx('product-item')}>
                  <Link to='/product'>
                    <img src='/src/assets/imgs/produc-01.webp' alt='' />
                  </Link>
                  <div className={cx('p-[10px]')}>
                    <Link to='/product'>
                      <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                        Cậu Ma Nhà Xí Hanako - Tập 10
                      </p>
                    </Link>
                    <div className={cx('d-flex items-center justify-between')}>
                      <div className={cx('text-primary font-medium')}>
                        28000 <span>đ</span>
                      </div>
                      <div
                        className={cx(
                          'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                        )}
                      >
                        <i className='fa-solid fa-plus'></i>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={cx('product-item')}>
                  <Link to='/product'>
                    <img src='/src/assets/imgs/produc-01.webp' alt='' />
                  </Link>
                  <div className={cx('p-[10px]')}>
                    <Link to='/product'>
                      <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                        Cậu Ma Nhà Xí Hanako - Tập 10
                      </p>
                    </Link>
                    <div className={cx('d-flex items-center justify-between')}>
                      <div className={cx('text-primary font-medium')}>
                        28000 <span>đ</span>
                      </div>
                      <div
                        className={cx(
                          'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                        )}
                      >
                        <i className='fa-solid fa-plus'></i>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={cx('product-item')}>
                  <Link to='/product'>
                    <img src='/src/assets/imgs/produc-01.webp' alt='' />
                  </Link>
                  <div className={cx('p-[10px]')}>
                    <Link to='/product'>
                      <p className={cx('text-[1.4rem] line-clamp-2 leading-relaxed my-[17px]')}>
                        Cậu Ma Nhà Xí Hanako - Tập 10
                      </p>
                    </Link>
                    <div className={cx('d-flex items-center justify-between')}>
                      <div className={cx('text-primary font-medium')}>
                        28000 <span>đ</span>
                      </div>
                      <div
                        className={cx(
                          'w-[30px] h-[30px] bg-primary rounded-[50%] d-flex items-center justify-center text-[#ffffff]'
                        )}
                      >
                        <i className='fa-solid fa-plus'></i>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* News */}
      <div className={cx('container-wrap')}>
        <div>
          <h1 className='font-medium text-4xl py-5 '>Sản phẩm đã xem</h1>
          <div className='grid lg:grid-cols-5 gap-5 py-5 sm:grid-cols-2 md:grid-cols-4'>
            <div>
              <img
                className='w-11/12 h-11/12'
                src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/f96d4cc1-1f2c-4e7a-99a5-d35956152e8c.jpg?v=1657509099123'
                alt=''
              />
              <div className='pl-9'>
                <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
              </div>
            </div>
            <div>
              <div>
                <img
                  src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/bb441049-87e8-475e-8f63-ec3d6249a06f.jpg?v=1657509092697'
                  alt=''
                />
              </div>
              <div className='pl-9'>
                <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
              </div>
            </div>
            <div>
              <img
                src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/bb441049-87e8-475e-8f63-ec3d6249a06f.jpg?v=1657509092697'
                alt=''
              />
              <div className='pl-9'>
                <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
              </div>
            </div>
            <div>
              <img
                src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/1508b90d-e088-47cd-89c4-9d520e336961.jpg?v=1657509086007'
                alt=''
              />
              <div className='pl-9'>
                <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
              </div>
            </div>
            <div>
              <img
                src='https://bizweb.dktcdn.net/thumb/large/100/441/742/products/e81c92c3-db6e-4e05-8a8b-fc45c94f6cb3.jpg?v=1657509094197'
                alt=''
              />
              <div className='pl-9'>
                <h2 className='font-medium text-2xl p-3'>cau Ma Nhà Xí Hanako - Tập 11 </h2>
                <span className='text-[#ba141a] font-medium text-2xl p-3'>28.000đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListProducts
